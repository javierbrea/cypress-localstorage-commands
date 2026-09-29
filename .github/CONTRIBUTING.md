# How to contribute

First off, thanks for taking the time to contribute!

# Table of Contents

- [Getting started](#getting-started)
  - [Requirements](#requirements)
  - [Installation](#installation)
  - [Repository structure](#repository-structure)
- [Contributing workflow](#contributing-workflow)
- [Development tasks](#development-tasks)
  - [Unit tests](#unit-tests)
  - [Mutation tests](#mutation-tests)
  - [E2E tests](#e2e-tests)
  - [Git hooks](#git-hooks)
  - [Continuous integration](#continuous-integration)
- [Style guides](#style-guides)
  - [Commit messages](#commit-messages)
- [Branching model](#branching-model)
  - [Merging strategy](#merging-strategy)
- [Pull Request](#pull-request)
- [Release process](#release-process)
  - [Versioning](#versioning)
  - [Publishing](#publishing)
- [License](#license)
- [Code of Conduct](#code-of-conduct)
- [Contributor License Agreement](#contributor-license-agreement)

# Getting started

## Requirements

- [Node.js](https://nodejs.org/) `>=22.22.1` for development. The exact requirement is defined in the `devEngines` field of the `package.json` file. Note that this only applies to development: the library itself supports the Node.js versions defined in the `engines` field.
- [pnpm](https://pnpm.io/). The exact version is defined in the `packageManager` field of the `package.json` file, so you can use [Corepack](https://nodejs.org/api/corepack.html) to install it automatically.

## Installation

To get started, fork and clone the repository, and install the dependencies:

```bash
pnpm install
```

This installs the dependencies of the library and also those of the E2E tests packages, including the Cypress binaries required to run them.

## Repository structure

This repository is a [pnpm workspace](https://pnpm.io/workspaces) that contains the library itself in the root folder, and some private packages used only to run E2E tests:

- `src`: Source code of the library.
- `index.js`, `plugin.js`, `index.d.ts`, `plugin.d.ts`: Entry points and TypeScript declarations of the library.
- `test`: Unit tests.
- `test-e2e/app`: A React application used as target of the E2E tests.
- `test-e2e/specs`: Cypress specs shared by the JavaScript E2E tests packages.
- `test-e2e/cypress-*`: Packages running the E2E specs with different Cypress versions, with and without installing the Node events plugin, and using TypeScript.

# Contributing workflow

In short, the contributing workflow is as follows:

1. __Open an issue__ before starting to work on any change, so it can be discussed first. Use the corresponding [issue template](https://github.com/javierbrea/cypress-localstorage-commands/issues/new/choose) to report a bug or to request a feature. Pull requests that were not previously discussed may be rejected. Minor changes, such as typo fixes in the documentation, can skip this step.
2. __Wait for the issue to be accepted__. If you want to work on it, comment on the issue (_"I'd like to work on this"_), and a maintainer will assign it to you. This avoids having more than one person working on the same thing.
3. __Create a branch from the `release` branch__ in your fork. Name it using the type of the change, the issue number, and a short description: `{type}/{issue-number}/{description}`. For example, `feat/571/migrate-cypress-env`. Read the [commit messages](#commit-messages) section to know the available types.
4. __Develop your changes__, following the [style guides](#style-guides) and running the [development tasks](#development-tasks) to check them.
5. __Open a Pull Request__ to the `release` branch. Read the [Pull Request](#pull-request) section for more information.

# Development tasks

The following scripts are defined in the root `package.json` file:

- `pnpm lint`: Lints JavaScript, TypeScript, JSON, and Markdown files using ESLint.
- `pnpm cspell`: Checks the spelling of all files.
- `pnpm tsc`: Checks the TypeScript types.
- `pnpm test:unit`: Runs the unit tests.
- `pnpm test:mutation`: Runs the mutation tests.
- `pnpm test:e2e`: Runs all the E2E tests.
- `pnpm test:ci`: Runs unit, mutation, and E2E tests.

## Unit tests

Unit tests are written using [Jest](https://jestjs.io/), and they are located in the `test` folder. __Coverage must remain at 100%__, otherwise the task will fail. The coverage report is generated in the `coverage` folder.

## Mutation tests

Mutation tests are executed with [Stryker](https://stryker-mutator.io/), using the unit tests. The task fails if the mutation score is lower than `80`. The HTML report is generated in the `reports` folder.

## E2E tests

E2E tests run Cypress specs against the application in the `test-e2e/app` folder, using different Cypress versions and configurations. Each E2E package builds and serves the application in the port `3000`, and then runs Cypress on it.

When adding new features or fixing bugs, __add the corresponding specs to the `test-e2e/specs/cypress/e2e` folder__, so they are executed by all the JavaScript E2E packages. Take into account that:

- Specs in nested folders are used to test the persistence of the localStorage across spec files, so they depend on the execution order. They must be declared explicitly in the configuration file of each E2E package (`cypress.config.js`).
- The `cypress-typescript` package has its own specs in its `cypress/e2e` folder, written in TypeScript. Add specs there too if your changes affect the TypeScript declarations.

You can run a specific E2E package using the corresponding script. For example:

```bash
pnpm test:e2e:cypress-latest
```

> [!TIP]
> To open Cypress in interactive mode while developing, serve the application with `pnpm --filter cypress-latest build:serve`, and then run `pnpm --filter cypress-latest cypress:open` in another terminal.

## Git hooks

A [Husky](https://typicode.github.io/husky/) pre-commit hook runs [lint-staged](https://github.com/lint-staged/lint-staged), which lints and checks the spelling of the staged files.

## Continuous integration

The `build` workflow runs in every pull request, checking the spelling, linting, checking types and running unit, mutation, and E2E tests using different Node.js versions. It also sends the results to [Coveralls](https://coveralls.io/github/javierbrea/cypress-localstorage-commands) and [SonarCloud](https://sonarcloud.io/project/overview?id=javierbrea_cypress-localstorage-commands). __All checks must pass before a pull request can be merged__, so it is recommended to run them locally before pushing.

# Style guides

## Commit messages

Commit messages follow the [Conventional Commits](https://www.conventionalcommits.org/) specification: `type(scope): Description`. The most common types are `feat`, `fix`, `docs`, `test`, `refactor`, `style`, and `chore`. Include the issue number as scope when applicable. For example: `feat(#571): Migrate from Cypress.env() to Cypress.expose()`, or `chore(deps): Upgrade dependencies`.

# Branching model

The repository follows a branching model based on two main branches: `master` and `release`. The `master` branch reflects the latest stable published version of the package, while the `release` branch is used to prepare the next release.

Some important points to consider:

- __The "master" branch must always reflect the latest stable published version of the package__.
- We have a "release" branch for the following reasons:
  - To enable the maintainer to prepare the release of features without having to promote any unpublished changes to the "master" branch. By preparing the release we mainly mean to decide how to group changes in different releases and to update the `CHANGELOG.md` file and the version number of the package accordingly.
  - It is long-lived because we also have bots, such as Renovate, that open PRs. So, they are configured to open PRs to the "release" branch, and their changes also enter in the process of preparing the release, as changes from any other contributor.
- __The "release" branch is the default branch for PRs.__ Only a project maintainer should open a PR to the "master" branch, and only when the release is ready to be published.
- Usually, feature branches should be short-lived, and they should be merged into the "release" branch as soon as possible. This way, the changes are included in the next release, and the feature branch can be deleted.
- When necessary, a medium-lived branch can be created from the "release" branch to group changes that will be released together and require more time to be prepared, such as `release-<version>`. Once the changes are ready, the branch can be merged into the "release" branch.

## Merging strategy

We use the __squash and merge strategy for merging PRs to the release branch__. This means that all the changes in the PR are squashed into a single commit before being merged. The reasons are:

- To keep the history clean in the release branch.
- To make it easier to understand the changes in each release.

But we use the __merge commit strategy for merging PRs to the master branch from the release branch__. The reasons are:

- To keep in the history the information about the features that were merged separately into the release branch. Squashing all the changes into a single commit would make it difficult to understand or revert the changes of a specific feature.
- To avoid having to rebase the release branch every time a PR is merged to the master branch.

# Pull Request

When you're finished with the changes, please ensure the following:

- You have added unit tests and E2E tests for your changes.
- You have updated the documentation in the `README.md` file if necessary.
- You have updated the TypeScript declarations if the API has changed.
- You have run the linter, the spelling check, the types check and all the tests, and fixed any issues.
- __You have added the necessary changes to the `CHANGELOG.md` file__, under the "unreleased" section at the beginning of the file.
- You have modified the version of the package according to the [versioning](#versioning) section.

When you have checked these points, then you are ready to submit your pull request. To do so, follow these steps:

- __The target branch for the PR should be `release`.__ (Read [branching model](#branching-model) for more information)
- Fill the PR template. This template helps reviewers understand your changes as well as the purpose of your pull request.
- Don't forget to [link PR to issue](https://docs.github.com/en/issues/tracking-your-work-with-issues/using-issues/linking-a-pull-request-to-an-issue) if you are solving one.
- Enable the checkbox to [allow maintainer edits](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/allowing-changes-to-a-pull-request-branch-created-from-a-fork) so the branch can be updated for a merge. Once you submit your PR, a maintainer will review your proposal. We may ask questions or request additional information.
- We may ask for changes to be made before a PR can be merged, either using suggested changes or pull request comments. You can apply suggested changes directly through the UI. You can make any other changes in your fork, then commit them to your branch.
- As you update your PR and apply changes, mark each conversation as resolved.

# Release process

## Versioning

The repository follows the [Semantic Versioning](https://semver.org/) specification. This means that the version number is composed of three parts: `MAJOR.MINOR.PATCH`.

Please, follow these rules to update the version number:

- __MAJOR__: When you make incompatible API changes. This includes dropping support for a Cypress or Node.js version.
- __MINOR__: When you add functionality in a backwards-compatible manner.
- __PATCH__: When:
  - You make backwards-compatible bug fixes.
  - You bump the version of a dependency which doesn't affect the API of the package.

> [!WARNING]
> The version number must be updated both in the `version` field of the `package.json` file and in the `sonar.projectVersion` property of the `sonar-project.properties` file.

## Publishing

Once the PR is approved and merged into the release branch, a project maintainer can start the release process when corresponding (sometimes it is not desired to release the changes immediately, so the maintainer can wait until more changes are merged to release them all together).

The release process is as follows:

- Checkout the `release` branch, and:
  - Move changes in the "unreleased" section of the `CHANGELOG.md` file to a new version section that includes the version number and the release date.
  - Check that the package has the correct version number in the `package.json` and `sonar-project.properties` files.
  - Commit the changes with the message `chore(release): description`.
- Open a PR from the `release` branch to the `master` branch.
  - The `check-package-version` workflow checks that the version in the `package.json` file is greater than the latest one published to npm, that the `CHANGELOG.md` file contains an entry for it, and that it matches the version in the `sonar-project.properties` file.
  - Once the PR is approved and merged, the build pipeline runs in the `master` branch, but the package is not published yet.
- Create a new release in GitHub, following the next instructions:
  - Tag: `vX.Y.Z` (Replace `X.Y.Z` with the version number, of course).
  - Title: A human readable title for the release.
  - Description: Copy the changes from the `CHANGELOG.md` file for the version you are releasing.
- Once the release is created, the package is published automatically to the npm registry, and to GitHub Packages as `@javierbrea/cypress-localstorage-commands`.

# License

By contributing to this project, you agree that your contributions will be licensed under the [LICENSE](../LICENSE) file in the root of this repository, and that you agree to the [Contributor License Agreement](#contributor-license-agreement).

# Code of Conduct

This project and everyone participating in it is governed by the [Code of Conduct](./CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please read it before contributing.

# Contributor License Agreement

This is a human-readable summary of (and not a substitute for) the [full agreement](./CLA.md). This highlights only some of the key terms of the CLA. It has no legal value and you should carefully review all the terms of the [actual CLA before agreeing](./CLA.md).

- __No Warranty or Support Obligations__. By making a contribution, you are not obligating yourself to provide support for the contribution, and you are not taking on any warranty obligations or providing any assurances about how it will perform.

The [CLA](./CLA.md) does not change the terms of the MIT License under which this project is distributed. You are still free to use it within your own projects or businesses, republish modified source code, and more subject to the terms of the project license.
