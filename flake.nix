{
  description = "Gold Mining Framework - Automated business idea generation and landing page deployment";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
  };

  outputs = { self, nixpkgs }:
    let
      supportedSystems = [ "x86_64-linux" "aarch64-linux" "x86_64-darwin" "aarch64-darwin" ];
      forAllSystems = nixpkgs.lib.genAttrs supportedSystems;
      pkgsFor = system: nixpkgs.legacyPackages.${system};
    in {
      packages = forAllSystems (system:
        let pkgs = pkgsFor system;
        in {
          reddit-scraper = pkgs.python3.pkgs.buildPythonApplication {
            pname = "reddit-scraper";
            version = "1.0.0";
            src = ./tools;
            pyproject = true;
            build-system = with pkgs.python3.pkgs; [ setuptools ];
            propagatedBuildInputs = with pkgs.python3.pkgs; [
              praw
              python-dotenv
              requests
            ];
            meta = {
              description = "Reddit scraper for collecting pain points and user frustrations";
              mainProgram = "reddit_scraper";
            };
          };

          default = self.packages.${system}.reddit-scraper;
        });

      apps = forAllSystems (system:
        let pkgs = pkgsFor system;
        in {
          reddit-scraper = {
            type = "app";
            program = "${self.packages.${system}.reddit-scraper}/bin/reddit_scraper";
          };
          default = self.apps.${system}.reddit-scraper;
        });

      devShells = forAllSystems (system:
        let pkgs = pkgsFor system;
        in {
          default = pkgs.mkShell {
            packages = with pkgs; [
              python3
              python3.pkgs.praw
              python3.pkgs.python-dotenv
              python3.pkgs.requests
              nodejs_20
            ];
            shellHook = ''
              echo "Gold Mining Framework dev shell"
              echo "Run: reddit_scraper --help"
            '';
          };
        });

      overlays.default = final: prev: {
        reddit-scraper = self.packages.${final.system}.reddit-scraper;
      };
    };
}
