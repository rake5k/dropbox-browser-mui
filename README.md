# Dropbox Browser MUI

Material-UI based Dropbox browser app.

## Development

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br> Open [http://localhost:3000](http://localhost:3000) to
view it in the browser.

The page will reload if you make edits.<br> You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br> See the section about [running
tests](#running-tests) for more information.

## Build

### `npm run build`

Builds the production optimized app. Afterwards you can copy the resulting `build` directory on a
host and serve it with your favourite http server.

### `nix build .#docker`

Creates Docker image archive based on the `build` directory, which then can be loaded into the
Docker daemon via `docker load < result`. It can then be run with `docker run -p 3000:80
<image>:<tag>`.

## References

For further details about the project setup, see the [Create React App docs](https://cra.link/).

