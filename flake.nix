{
  description = "My personal website dev env";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = nixpkgs.legacyPackages.${system};
      in
      {
        devShells.default = pkgs.mkShell {
          buildInputs = with pkgs; [
            # Web development tools
            nodejs_24
            nodePackages.live-server
            nodePackages.prettier
            nodePackages.eslint

            # Static site generators
            # hugo

            # Version control and deployment
            git
            gh
          ];

          shellHook = ''
            echo "Personal website dev environment loaded!"
            echo "Available commands:"
            echo "  live-server src/    - Start local dev server"
            echo "  prettier --write .  - Format code"
            echo "  eslint src/         - Lint JavaScript"
            echo ""
          '';
        };
      });
}

