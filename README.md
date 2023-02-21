# Dropbox Browser MUI

Trivial Material-UI based Dropbox browsing app.

## CI Status

|                Platform                | Status                                                                                                                                                                                                                                                                                                                                             |
|:--------------------------------------:|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| ![GitHub](./img/GitHub_Logo_White.png) | [![Continuous Integration][gh-ci-badge]][gh-ci] [![Continuous Deployment][gh-cd-badge]][gh-cd] [![Release][gh-release-badge]][gh-release]                                                                                                                                                                                                          |
|  [![SonarCloud][sonar-badge]][sonar]   | [![Reliability Rating][sonar-rr-badge]][sonar-rr] [![Maintainability Rating][sonar-mty-badge]][sonar-mty] [![Security Rating][sonar-sec-badge]][sonar-sec]<br /> [![Bugs][sonar-bugs-badge]][sonar-bugs] [![Code Smells][sonar-cs-badge]][sonar-cs] [![Vulnerabilities][sonar-vn-badge]][sonar-vn]<br /> [![Coverage][sonar-cov-badge]][sonar-cov] |

## Development

In the project directory, you can run:

### `npm start`

Runs the app in the development mode. Open [http://localhost:5173](http://localhost:5173) to
preview it in the browser.

Hot reloading will be active, and compilation or lint errors will also be displayed in the browser.

### `npm test`

Launches the test runner in the interactive watch mode.<br> See the section about [running
tests](#running-tests) for more information.

## Build

### `nix build`

Builds the application, optimized for production. Afterwards you can copy the
resulting `./result/lib/node_modules/dropbox-browser-mui/dist` directory on a host and serve it with
your favourite http server.

### `nix build .#docker`

Creates Docker image archive based on the `build` directory, which then can be loaded into the
Docker daemon via `docker load < result`. It can then be run with `docker run -p 3000:80
<image>:<tag>`.

[direnv]: https://direnv.net
[dropbox-dev-console]: https://www.dropbox.com/developers/apps
[gh-cd]: https://github.com/christianharke/dropbox-browser-mui/actions/workflows/cd.yml
[gh-cd-badge]: https://github.com/christianharke/dropbox-browser-mui/actions/workflows/cd.yml/badge.svg
[gh-ci]: https://github.com/christianharke/dropbox-browser-mui/actions/workflows/ci.yml
[gh-ci-badge]: https://github.com/christianharke/dropbox-browser-mui/actions/workflows/ci.yml/badge.svg
[gh-release]: https://github.com/christianharke/dropbox-browser-mui/actions/workflows/version.yml
[gh-release-badge]: https://github.com/christianharke/dropbox-browser-mui/actions/workflows/version.yml/badge.svg
[nix]: https://nixos.org/download.html
[nix-flakes-enable]: https://nixos.wiki/wiki/Flakes#Enable_flakes
[nix-and-direnv]: https://determinate.systems/posts/nix-direnv
[sonar]: https://sonarcloud.io/summary/new_code?id=christianharke_dropbox-browser-mui
[sonar-badge]: https://sonarcloud.io/images/project_badges/sonarcloud-white.svg
[sonar-bugs]: https://sonarcloud.io/summary/new_code?id=christianharke_dropbox-browser-mui
[sonar-bugs-badge]: https://sonarcloud.io/api/project_badges/measure?project=christianharke_dropbox-browser-mui&metric=bugs
[sonar-cov]: https://sonarcloud.io/summary/new_code?id=christianharke_dropbox-browser-mui
[sonar-cov-badge]: https://sonarcloud.io/api/project_badges/measure?project=christianharke_dropbox-browser-mui&metric=coverage
[sonar-cs]: https://sonarcloud.io/summary/new_code?id=christianharke_dropbox-browser-mui
[sonar-cs-badge]: https://sonarcloud.io/api/project_badges/measure?project=christianharke_dropbox-browser-mui&metric=code_smells
[sonar-mty]: https://sonarcloud.io/summary/new_code?id=christianharke_dropbox-browser-mui
[sonar-mty-badge]: https://sonarcloud.io/api/project_badges/measure?project=christianharke_dropbox-browser-mui&metric=sqale_rating
[sonar-rr]: https://sonarcloud.io/summary/new_code?id=christianharke_dropbox-browser-mui
[sonar-rr-badge]: https://sonarcloud.io/api/project_badges/measure?project=christianharke_dropbox-browser-mui&metric=reliability_rating
[sonar-sec]: https://sonarcloud.io/summary/new_code?id=christianharke_dropbox-browser-mui
[sonar-sec-badge]: https://sonarcloud.io/api/project_badges/measure?project=christianharke_dropbox-browser-mui&metric=security_rating
[sonar-vn]: https://sonarcloud.io/summary/new_code?id=christianharke_dropbox-browser-mui
[sonar-vn-badge]: https://sonarcloud.io/api/project_badges/measure?project=christianharke_dropbox-browser-mui&metric=vulnerabilities
