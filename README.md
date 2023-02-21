# Dropbox Browser MUI

Trivial Material-UI based Dropbox browsing app.

## CI Status

|                Platform                | Status                                                                                                                                                                                                                                                                                                                                             |
|:--------------------------------------:|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| ![GitHub](./img/GitHub_Logo_White.png) | [![Continuous Integration][gh-ci-badge]][gh-ci] [![Continuous Deployment][gh-cd-badge]][gh-cd] [![Release][gh-release-badge]][gh-release]                                                                                                                                                                                                          |
|  [![SonarCloud][sonar-badge]][sonar]   | [![Reliability Rating][sonar-rr-badge]][sonar-rr] [![Maintainability Rating][sonar-mty-badge]][sonar-mty] [![Security Rating][sonar-sec-badge]][sonar-sec]<br /> [![Bugs][sonar-bugs-badge]][sonar-bugs] [![Code Smells][sonar-cs-badge]][sonar-cs] [![Vulnerabilities][sonar-vn-badge]][sonar-vn]<br /> [![Coverage][sonar-cov-badge]][sonar-cov] |

## Getting started

### Development environment

The easiest way to get up and running is by using [Nix][nix] and [Direnv][direnv]. This project
makes use of the experimental Nix Flakes and therefore requires
to [enable that feature][nix-flakes-enable] as well.

For more info about this topic refer to the
corresponding [blog post from Determinate Systems][nix-and-direnv].

### Dropbox API

In order to access the Dropbox V2 API, an access token is required. This can be generated on a
per-app basis via the [Developer Console][dropbox-dev-console].

The access token then needs to be provided via an enrivonment variable:

```shell
$ export VITE_DROPBOX_ACCESS_TOKEN=<token>
```

## Developing

### `npm run dev`

Runs the app in development mode on [http://localhost:5173](http://localhost:5173).

Hot reloading will be available, and compilation or linting errors will also be displayed inside the
browser.

### `npm start`

For production mode.

### `npm test`

Run the test cases.

### `npm test:watch`

Launches the test runner in interactive watch mode.

## Building

### `nix build`

Builds the application, optimized for production. Afterwards you can copy the
resulting `./result/lib/node_modules/dropbox-browser-mui/dist` directory on a host and serve it with
your favourite http server.

### `nix build .#docker`

Creates a Docker image archive based on the `build` directory, which then can be loaded into the
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
