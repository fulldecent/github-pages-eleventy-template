STATUS: This is a discussion draft. We will be implementing best practices applied from https://github.com/fulldecent/github-pages-template/edit/main/README.md

# How to run this application locally

## Setup environment

_In production (GitHub Actions), environment is setup by by workflows in [.github/workflows/](.github/workflows/)._

_For local testing (try VS Code + Dev Containers extension, Podman Desktop), these steps are performed by [.devcontainer/](.devcontainer/) when you run Reopen in Container._

1. Install Node & Yarn Berry, use version in build-test-deploy.yml in "Setup Node.js", (try nvm)

   ```sh
   nvm install --lts --reinstall-packages-from=current
   nvm use --lts
   corepack enable
   yarn install
   ```

## Build the site

Build the HTML website (see available localhost:#### port in the console output):

```sh
[ COMING SOON ]
```

## Serve/run the site

```sh
[ COMING SOON ]
```

## (Bonus) if you will build using Eleventy but deploy to a different server with a script interpreter

You can run PHP or similar on the built site. Here's how.

```sh
[ COMING SOON ]
(cd build; php -S localhost:4001)
```

## Testing

All testing is performed using Node scripts:

```sh
yarn test
```

## VS Code

Open this folder in VS Code and install recommended extensions. Then use "Reload Window" to activate them.

This will give you formatting, linting, and other tools to help you develop.
