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
            nodePackages.npm
            nodePackages.yarn
            nodePackages.pnpm

            nodePackages.prettier
            nodePackages.eslint
            nodePackages.typescript

            # Version control and deployment
            git
            gh
          ];

          shellHook = ''
            echo "⚛️  React website dev environment loaded!"
            echo "Available commands:"
            echo "  npm install         - Install dependencies"
            echo "  npm run dev         - Start development server"
            echo "  npm run build       - Build for production"
            echo "  npm run preview     - Preview production build"
            echo "  npm run lint        - Lint code"
            echo "  npm run format      - Format code with Prettier"
            echo ""

            # Set up npm if package.json doesn't exist
            if [ ! -f package.json ]; then
              echo "📦 Setting up React project..."
              npm create vite@latest . -- --template react
            fi
          '';
        };
      });
}
