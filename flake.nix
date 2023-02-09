{
  description = "Dropbox Browser based on React";

  inputs = {
    nixpkgs.url = "nixpkgs/nixos-unstable";

    pre-commit-hooks = {
      url = "github:cachix/pre-commit-hooks.nix";
      inputs = {
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
      };
    };
  };

  outputs = { self, nixpkgs, pre-commit-hooks, gitignore, dream2nix }:
    let
      name = "dropbox-browser-mui";

      # System types to support.
      supportedSystems = [ "aarch64-linux" "x86_64-linux" ];

      # Helper function to generate an attrset '{ x86_64-linux = f "x86_64-linux"; ... }'.
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
        checks = forAllSystems (system:
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
                app = dream2nixOutputs.packages."${system}".default;
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
                enableFakechroot = true;

                config = {
                  Cmd = [ "${pkgs.lighttpd}/bin/lighttpd" "-D" "-f" "${lighttpdConf}" ];
                  ExposedPorts = {
                    "80" = { };
                  };
                };
              };
          });

        devShells = forAllSystems (system:
          let
            pkgs = nixpkgsFor.${system};
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
