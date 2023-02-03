# Dropbox Browser MUI

Trivial Material-UI based Dropbox browsing app.

## CI Status

|                                                                            Platform                                                                             | Status                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
|:---------------------------------------------------------------------------------------------------------------------------------------------------------------:|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|                                                             ![GitHub](./img/GitHub_Logo_White.png)                                                              | [![Continuous Integration](https://github.com/christianharke/dropbox-browser-mui/actions/workflows/ci.yml/badge.svg)](https://github.com/christianharke/dropbox-browser-mui/actions/workflows/ci.yml) [![Continuous Deployment](https://github.com/christianharke/dropbox-browser-mui/actions/workflows/cd.yml/badge.svg)](https://github.com/christianharke/dropbox-browser-mui/actions/workflows/cd.yml) [![Release](https://github.com/christianharke/dropbox-browser-mui/actions/workflows/version.yml/badge.svg)](https://github.com/christianharke/dropbox-browser-mui/actions/workflows/version.yml)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| [![SonarCloud](https://sonarcloud.io/images/project_badges/sonarcloud-white.svg)](https://sonarcloud.io/summary/new_code?id=christianharke_dropbox-browser-mui) | [![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=christianharke_dropbox-browser-mui&metric=reliability_rating)](https://sonarcloud.io/summary/new_code?id=christianharke_dropbox-browser-mui) [![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=christianharke_dropbox-browser-mui&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=christianharke_dropbox-browser-mui) [![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=christianharke_dropbox-browser-mui&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=christianharke_dropbox-browser-mui)<br /> [![Bugs](https://sonarcloud.io/api/project_badges/measure?project=christianharke_dropbox-browser-mui&metric=bugs)](https://sonarcloud.io/summary/new_code?id=christianharke_dropbox-browser-mui) [![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=christianharke_dropbox-browser-mui&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=christianharke_dropbox-browser-mui) [![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=christianharke_dropbox-browser-mui&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=christianharke_dropbox-browser-mui)<br /> [![Coverage](https://sonarcloud.io/api/project_badges/measure?project=christianharke_dropbox-browser-mui&metric=coverage)](https://sonarcloud.io/summary/new_code?id=christianharke_dropbox-browser-mui) |

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

### `npm run build`

Builds the application, optimized for production. Afterwards you can copy the resulting `build`
directory on a host and serve it with your favourite http server.

### `nix build .#docker`

Creates Docker image archive based on the `build` directory, which then can be loaded into the
Docker daemon via `docker load < result`. It can then be run with `docker run -p 3000:80
<image>:<tag>`.

## References

For further details about the project setup, see the [Create React App docs](https://cra.link/).

