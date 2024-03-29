{
  description = "Dropbox Browser based on React";

  inputs = {
    nixpkgs.url = "nixpkgs/nixos-unstable";

    pre-commit-hooks = {
      url = "github:cachix/pre-commit-hooks.nix";
      inputs = {
        gitignore.follows = "gitignore";
        nixpkgs.follows = "nixpkgs";
      };
    };

    gitignore = {
      url = "github:hercules-ci/gitignore.nix";
      inputs.nixpkgs.follows = "nixpkgs";
    };

    dream2nix = {
      url = "github:nix-community/dream2nix";
      inputs = {
        nixpkgs.follows = "nixpkgs";
        pre-commit-hooks.follows = "pre-commit-hooks";
      };
    };
  };

  outputs = { self, nixpkgs, pre-commit-hooks, gitignore, dream2nix }:
    let
      name = "dropbox-browser-mui";

      devSystems = [ "x86_64-linux" ];
      forDevSystems = nixpkgs.lib.genAttrs devSystems;

      # System types to support.
      supportedSystems = [ "aarch64-linux" ] ++ devSystems;
      forAllSystems = nixpkgs.lib.genAttrs supportedSystems;

      # Nixpkgs instantiated for supported system types.
      nixpkgsFor = forAllSystems (system: import nixpkgs { inherit system; });

      dream2nixOutputs = dream2nix.lib.makeFlakeOutputs {
        systems = supportedSystems;
        config.projectRoot = ./.;
        projects = ./projects.toml;
        source = gitignore.lib.gitignoreSource ./.;
      };

      customOutput = {
        checks = forDevSystems (system:
          {
            pre-commit-check = pre-commit-hooks.lib."${system}".run {
              src = ./.;
              hooks = {
                nixpkgs-fmt.enable = true;
                statix.enable = true;
              };
            };
          });

        packages = forAllSystems (system:
          let
            pkgs = nixpkgsFor.${system};
          in
          {
            docker =
              let
                app = self.packages."${system}".default;
                lighttpdConf = pkgs.writeText "lighttpd.conf" ''
                  var.basedir  = "/var/www/localhost"
                  var.statedir = "/var/lib/lighttpd"

                  include "${pkgs.lighttpd}/share/lighttpd/doc/config/conf.d/mime.conf"

                  server.document-root = "/"
                  server.pid-file      = "/run/lighttpd.pid"

                  server.indexfiles    = ("index.html")
                  server.follow-symlink = "enable"
                '';
              in
              pkgs.dockerTools.buildLayeredImage {
                name = "christianharke/${app.pname}";
                tag = app.version;
                contents = with pkgs; [
                  bash
                  coreutils
                  "${app}/lib/node_modules/dropbox-browser-mui/build"
                ];
                fakeRootCommands = ''
                  mkdir -p /var/tmp /var/www/localhost /var/lib/lighttpd /run
                '';
                # Crucially, instead of a relative path, this creates /bin, which is intercepted by
                # fakechroot. This functionality is not available on darwin as of 2021.
                # see: https://github.com/NixOS/nixpkgs/blob/master/pkgs/build-support/docker/examples.nix
                enableFakechroot = true;

                config = {
                  Cmd = [ "${pkgs.lighttpd}/bin/lighttpd" "-D" "-f" "${lighttpdConf}" ];
                  ExposedPorts = {
                    "80" = { };
                  };
                };
              };
          });

        devShells = forDevSystems (system:
          let
            pkgs = nixpkgsFor."${system}";
          in
          {
            default = pkgs.mkShell {
              buildInputs = with pkgs; [
                # banner printing on enter
                figlet
                lolcat

                nixpkgs-fmt
                statix

                nodejs-18_x
                xsel
              ];

              shellHook = ''
                figlet -w 106 ${name} | lolcat --freq 0.5
                ${self.checks.${system}.pre-commit-check.shellHook}
              '';
            };
          });
      };
    in
    nixpkgs.lib.recursiveUpdate dream2nixOutputs customOutput;
}
