# Trail notes

> [!TIP]
> This template is a starting point for a website built with [Eleventy](https://www.11ty.dev/) and published on GitHub Pages. We offer:
>
> * A build that runs in GitHub Actions, because GitHub Pages does not run Eleventy
> * Continuous integration to [check formatting](.github/workflows/lint.yml), then [build, test, and deploy](.github/workflows/build-test-deploy.yml)
> * Modern [EditorConfig](.editorconfig), [.gitignore](.gitignore) and linting
>
> What is in-scope for this template?
>
> We the people who publish a small site from a repository, in order to keep one Eleventy build and to make that site inviting for more editors, maintain this starting point.
>
> Pages live under [src/](src/). Node.js and Yarn are pinned in this repository. GitHub Pages publishes the files Eleventy writes.
>
> For a site that must match the [github-pages](https://github.com/github/pages-gem) gem, use [github-pages-template](https://github.com/fulldecent/github-pages-template). This project will not grow a second build system, and it will not cut a Release Please version for each content change.
>
> And now below is the template, shown for a specific hypothetical project, enjoy!

[![Lint](https://github.com/fulldecent/github-pages-eleventy-template/actions/workflows/lint.yml/badge.svg)](https://github.com/fulldecent/github-pages-eleventy-template/actions/workflows/lint.yml) [![Build, test, deploy](https://github.com/fulldecent/github-pages-eleventy-template/actions/workflows/build-test-deploy.yml/badge.svg)](https://github.com/fulldecent/github-pages-eleventy-template/actions/workflows/build-test-deploy.yml)

A short log of two walks, with the directions left for the next person.

Our site offers:

* A home page that lists the walks
* One page per walk, written in Markdown
* The Node.js and Yarn versions the build expects

[ Imagine a photo here of the trail log open on a phone at the trailhead. ]

> [!NOTE]
> Replace the project name, description, picture and badge URLs with your own. Show the site before asking people to read further.

## Try it out

The site is published at <https://fulldecent.github.io/github-pages-eleventy-template/>. Open it and read the two walks.

> [!NOTE]
> Replace this address with your published site. Delete this section when the site has no public page yet.
>
> In the repository settings, under Pages, Build and deployment, set Source to GitHub Actions. The workflow files do not change that setting.

## Usage

Read the home page, then open a walk. The creek walk stays on the east bank until the footbridge. The ridge walk turns around at the bench.

> [!NOTE]
> Explain how to use your project.

## Development

Thank you for taking an interest in improving our trail notes and the websites of people who started from this project!

_In production (GitHub Actions), the environment is set up by the workflows in [.github/workflows/](.github/workflows/)._

Use VS Code and the [Dev Containers extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers), install a Docker host (on Mac, use [OrbStack](https://orbstack.dev/)) then run the VS Code command "Reopen in Container".

Or install the toolchain on the host. [fnm](https://github.com/Schniz/fnm) reads [.node-version](.node-version). The Yarn version is `packageManager` in [package.json](package.json).

```sh
fnm install
fnm use
corepack enable
yarn install
```

Corepack installs that Yarn. A `yarn` binary from Homebrew 1.x ignores `packageManager` and will not run this project.

For a Node.js module or command-line tool, start from <https://github.com/fulldecent/node.js-template>.

Build the HTML:

```sh
yarn build
```

That writes the site into `build/`. The local build uses path prefix `/`, which is correct for <http://127.0.0.1:8080>. GitHub Actions passes `--pathprefix` so a project site is served under `/<repository>/`. [HtmlBasePlugin](https://www.11ty.dev/docs/plugins/html-base/) rewrites root-absolute URLs such as `/css/site.css`. `page.url` already contains the prefix, so this site links with `filePathStem` and lets the plugin add the prefix once.

Serve it locally:

```sh
yarn dev
```

Open <http://127.0.0.1:8080>. The console prints the address when the port differs.

The files in `build/` are the site. A machine that serves files, including `php -S 127.0.0.1:8080 -t build`, can host that directory. That server does not run Eleventy.

Editors change pages under [src/](src/). The home page is [src/index.md](src/index.md). Walks are Markdown files in [src/notes/](src/notes/). The layout is [src/_includes/layout.njk](src/_includes/layout.njk).

Open this folder in VS Code and install the recommended extensions. That installs EditorConfig, Markdown linting, and Prettier. `yarn format` is the command CI checks. The Prettier extension formats with its own copy of Prettier, and CI installs `prettier@latest`, so run `yarn format` before you send a pull request.

### Testing

Every update we publish has to pass the test suite. GitHub runs that suite on each push to `main` and on pull requests. Run it locally before you send a pull request. Build the site first.

```sh
yarn build
yarn test
```

`yarn test` reads `build/`. It checks that the home page lists both walks and that each walk page has its title and directions.

Correct formatting before you send proposed changes. A build is unnecessary for this command.

```sh
yarn format
```

### Releases

A push to the default branch publishes the site. The deploy job in [build-test-deploy.yml](.github/workflows/build-test-deploy.yml) uploads the `build/` artifact to GitHub Pages after the tests pass.

This repository does not use Release Please. Visitors receive the site at the URL above. A copied website that used Release Please would open a release pull request for ordinary page edits. A git tag names a revision of this template, with no `v` prefix, in the same way [github-pages-template](https://github.com/fulldecent/github-pages-template) tags `1.8.0`.

List tags, then mark the current `main` commit when this starter changes:

```sh
gh api repos/{owner}/{repo}/tags --jq '.[].name'
gh api --method POST repos/{owner}/{repo}/git/refs \
  -f ref="refs/tags/1.0.0" \
  -f sha="$(gh api repos/{owner}/{repo}/commits/main --jq .sha)"
```

`gh` fills in `{owner}/{repo}` from the clone. Use the next number when a tag already exists.

> [!NOTE]
> Replace this section with how your site is published. Delete the tag commands when the repository is a site and nobody cites a revision of it.

### Maintenance

The project administrator completes these maintenance tasks each month. If they are 3+ months late, please remind them or send your own issue/pull request.

1. Identify external Actions in [.github/workflows](./.github/workflows) scripts and look for available new versions. Review and then update to the new version if it is safe. GitHub-supported Actions (i.e. under the actions/ organization) may require only cursory review.
1. Update the Node.js pin, Yarn, and packages.

   ```sh
   curl -s https://nodejs.org/dist/index.json | jq -r '[.[] | select(.lts != false)][0].version' > .node-version
   yarn set version latest && yarn
   yarn upgrade-interactive
   ```

   [.devcontainer/devcontainer.json](.devcontainer/devcontainer.json) repeats the Node major and the Yarn version, because that image has no way to read `.node-version` or `packageManager`. Update those pins in the same change.
1. Read the [Eleventy release notes](https://www.11ty.dev/docs/versions/) before moving the major version. This site is built with the current stable release, not the alpha.

## Project scope

We are people who keep a shared log of walks and want a new editor to add a page without learning a second toolchain.

This site is one home page and a collection of walk notes. Eleventy builds the HTML. GitHub Pages serves the files.

A change that needs a server at request time is outside this site. So is a build that has to match the github-pages gem. That build is [github-pages-template](https://github.com/fulldecent/github-pages-template).

> [!NOTE]
> Introduce your community, explain what is in scope, and say what is out of scope.

## References

1. We use title case only for proper nouns, including the name of our project.
1. This project is built based on [best practices documented in github-pages-template](https://github.com/fulldecent/github-pages-template), release 1.8.0. The README shape, the Pages artifact deploy, and publishing the site on every push to the default branch come from that release. The Ruby, Jekyll, and Liquid-Prettier pieces stay there.
1. This project is built based on [best practices documented in project-template](https://github.com/fulldecent/project-template), release v1.3.0.
1. This project is released under the [MIT license](./LICENSE.md).
1. [EditorConfig](.editorconfig) and the top of [.gitignore](.gitignore) are taken from project-template release v1.3.0. The rules that follow are `/build` and `/.yarn`, then [Node.gitignore](https://github.com/github/gitignore/blob/main/Node.gitignore). The Node paste repeats the `.env` lines.
1. [Eleventy](https://www.11ty.dev/) 3.1.6 builds the site. [HTML `<base>` plugin](https://www.11ty.dev/docs/plugins/html-base/) applies the [path prefix](https://www.11ty.dev/docs/config/#deploy-to-a-subdirectory-with-a-path-prefix) that GitHub project pages require. Eleventy 4 was still an alpha when this was written, so the dependency stays on the stable 3.x line.
1. Markdown uses [markdownlint-cli2](https://github.com/DavidAnson/markdownlint-cli2) and [.markdownlint-cli2.yaml](.markdownlint-cli2.yaml), which extends `markdownlint/style/prettier` and limits `no-duplicate-heading` to siblings. Prettier skips `*.md`. The lint workflow still matches project-template: `npx` installs the latest Prettier and markdownlint on a floating Node.js LTS, so a pinned devDependency cannot drift away from CI.
1. `.yarnrc.yml` sets `enableScripts`, `npmMinimalAgeGate` to 0, and `approvedGitRepositories` to `"**"`. [Yarn: Security](https://yarnpkg.com/features/security)
1. For Mac, [OrbStack](https://orbstack.dev/) runs the dev container.

> [!NOTE]
> Carefully consider which license to apply to your project and replace the copyright line in [LICENSE.md](LICENSE.md). Cite the release of github-pages-eleventy-template you copied, and cite external sources that materially informed your decisions.
