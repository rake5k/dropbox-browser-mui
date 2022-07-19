{
  description = "Dropbox Browser based on React";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-22.05";

    pre-commit-hooks = {
      url = "github:cachix/pre-commit-hooks.nix?rev=6799201bec19b753a4ac305a53d34371e497941e";
      inputs = {
        nixpkgs.follows = "nixpkgs";
      };
    };
  };

  outputs = { self, nixpkgs, pre-commit-hooks }:
    let
      name = "dropbox-browser";

      # System types to support.
      supportedSystems = [ "x86_64-linux" ];

      # Helper function to generate an attrset '{ x86_64-linux = f "x86_64-linux"; ... }'.
      forAllSystems = nixpkgs.lib.genAttrs supportedSystems;

      # Nixpkgs instantiated for supported system types.
      nixpkgsFor = forAllSystems (system: import nixpkgs { inherit system; });
    in
    {
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

      devShells = forAllSystems (system:
        let
          pkgs = nixpkgsFor.${system};
        in
        {
          default = pkgs.mkShell {
            inherit name;

            REACT_APP_TITLE = "Dropbox Browser Dev";

            buildInputs = with pkgs; [
              # banner printing on enter
              figlet
              lolcat

              nodejs-18_x
              xsel
            ];

            shellHook = ''
              figlet -w 83 ${name} | lolcat --freq 0.5
                ${self.checks.${system}.pre-commit-check.shellHook}
            '';
          };
        });
    };
}
