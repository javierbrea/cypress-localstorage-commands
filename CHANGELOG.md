# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [unreleased]
### Added
### Changed
### Fixed
### Removed

## [2.2.7] - 2024-12-06

### Added
* chore: Check spelling in build workflow

### Changed
* chore: Use Pnpm as package manager
* chore: Upgrade eslint configuration to v9
* chore: Update devDependencies

### Fixed
* docs: Fix typos in README

## [2.2.6] - 2024-05-17

### Added
* chore: Handle jobs concurrency in build workflow

### Changed
* chore: Remove usage of "set-output" in build workflow
* chore(deps): Update devDependencies

## [2.2.5] - 2023-11-15

### Changed
- chore(deps): Update devDependencies

## [2.2.4] - 2023-08-14

### Changed
- chore(deps): Update devDependencies

## [2.2.3] - 2023-04-03

### Changed
- chore(deps): Update devDependencies

## [2.2.2] - 2022-12-07

### Added
- docs: Add alternatives

### Changed
- chore(deps): Update devDependencies
- test(e2e): Rename cypress-10 folder to cypress-latest
- test(e2e): Use Cypress 12 in E2E tests

## [2.2.1] - 2022-08-30

### Changed
- chore(deps): Update devDependencies

## [2.2.0] - 2022-07-26

### Added
- feat(#401): Support preserving localStorage across spec files. Node events must be installed to support this feature.

### Changed
- docs: Update docs with installation method in Cypress v10. Add notes about installing it in prior versions.
- chore(deps): Update devDependencies
- test(e2e): Add E2E tests using different Cypress versions

## [2.1.0] - 2022-06-02

### Changed
- chore: Update Cypress devDependency to v10
- test: Use Cypress v10 for running plugin e2e tests. Update configuration.
- chore: Update github actions versions

## [2.0.0] - 2022-05-30

### Removed
- chore: Drop NodeJs 12 support
- docs: Remove Fossa badge

### Changed
- chore: Remove NodeJs v12 from tests workflow. Add NodeJs v18
- chore(deps): Update devDependencies

## [1.7.0] - 2022-02-22

### Added
- feat(#376): Support multiple snapshots allowing to define a name in save, restore and clear commands.
- chore: Add command to check types. Run it in build workflow
- chore: Add eslint plugins

### Removed
- docs: Remove broken dependencies badge

### Changed
- chore: Remove NodeJs v15 from tests workflow. Add NodeJs v17
- chore(deps): Update devDependencies

## [1.6.1] - 2021-11-11
### Changed
- chore(#382): Use Cypress v9 in E2E tests
- chore(#382): Support any Cypress version greater than 2.1.0
- chore(deps): Update devDependencies

## [1.6.0] - 2021-11-01
### Changed
- chore(deps): Update devDependencies
- chore(deps): Support any NodeJs version greater than 10.x.

## [1.5.0] - 2021-07-21
### Added
- chore(#330): Use Cypress v8 in E2E tests. Add Cypress v8.x to peerDependencies

### Changed
- chore(deps): Update devDependencies

## [1.4.5] - 2021-05-29

### Changed
- chore(deps): Update devDependencies
- chore: Migrate Sonar project

## [1.4.4] - 2021-04-29

### Added
- chore(deps): Support Node v16.x in engines. Run tests also in node 16.0.0

### Changed
- chore(deps): Update devDependencies

## [1.4.3] - 2021-04-07

### Added
- chore(deps): Support Cypress v7.x in peerDependencies

### Changed
- test(e2e): Run e2e tests in Cypress v7.x
- chore(pipelines): Update node versions
- chore(pipelines): Do not run tests in Node 10, because it is not supported by Cypress v7.x
- chore(deps): Update devDependencies

## [1.4.2] - 2021-03-31

### Changed
- chore(deps): Update devDependencies

## [1.4.1] - 2021-02-24

### Changed
- chore(deps): Update devDependencies
- test: Refactor Sonar smells

## [1.4.0] - 2021-01-17

### Added
- chore: Add types property to package.json (#232)

### Changed
- chore(deps): Update devDependencies
- test(e2e): Adapt testing react app code to [data-provider v3](https://www.data-provider.org/docs/guides-migrating-from-v2-to-v3)

## [1.3.1] - 2020-12-11

### Changed
- chore(#210): Support all Node.js releases that have not passed their end date
- chore(deps): Update devDependencies
- chore(ci): Do not execute SonarCloud on PRs from forks

### Fixed
- docs(readme): Fix build badge url

## [1.3.0] - 2020-12-07

### Added
- feat(#191): Add disableLocalStorage command (Thanks to @Uninen for his contribution).

### Changed
- chore(deps): Update some devDependencies

### Fixed
- style(lint): Lint also files in root folder. Fix jest.config style

## [1.2.5] - 2020-12-05

### Changed
- chore(ci): Migrate CI to github actions. Rename npm commands
- chore(deps): Add Cypress 6.x to peerDependencies
- chore(test): Update Cypress to v6.0.1 in e2e tests
- chore(deps): Update devDependencies

## [1.2.4] - 2020-10-29

### Added
- chore(deps): Add node engine dep option for node@v15.x

### Changed
- chore(deps): Update devDependencies

## [1.2.3] - 2020-10-19

### Changed
- chore(deps): Update devDependencies
- test(cypress): Do not use "be" as assertion in Cypress tests as it is no longer supported
- chore(deps): Modify Stryker config to adapt it to Stryker 4.0 version

## [1.2.2] - 2020-08-27

### Changed
- chore(deps): Add Cypress ^5.0.0 to peerDependencies
- chore(deps): Update devDependencies

## [1.2.1] - 2020-06-09

### Fixed
- fix(TypeScript): Fix TypeScript return types declarations

### Changed
- chore(deps): Update devDependencies

## [1.2.0] - 2020-05-31

### Added
- feat(TypeScript): Add TypeScript support

## [1.1.10] - 2020-05-16

### Added
- tests(stryker): Add Stryker-mutator tests

### Changed
- chore(deps): Update devDependencies

## [1.1.9] - 2020-04-28

### Changed
- chore(deps): Allow node.js v14
- chore(deps): Update devDependencies

## [1.1.8] - 2020-04-09

### Changed
- chore(deps): Update devDependencies

## [1.1.7] - 2020-03-22
### Changed
- chore(deps): Update devDependencies

## [1.1.6] - 2020-02-19
### Changed
- chore(deps): Add Cypress ^4.0.0 to peerDependencies
- chore(test): Update Cypress to v4.0.2 in e2e tests
- chore(deps): Update eslint-plugin-react and husky devDependencies
- chore(test): Update react-scripts devDependency in e2e tests
- docs(readme): Fix typo

## [1.1.5] - 2020-02-01
### Changed
- Update devDependencies

## [1.1.4] - 2020-01-13
### Changed
- Use fixed versions in e2e tests dependencies

## [1.1.3] - 2020-01-13
### Changed
- Use fixed versions in dependencies

## [1.1.2] - 2020-01-11
### Changed
- Upgrade dependencies
- Disable temporarily Sonar as it is under maintenance

## [1.1.1] - 2019-12-28
### Changed
- Upgrade dependencies.
- Rename acceptance tests into e2e tests.
- Improve documentation examples.

### Added
- Add npm command for running e2e tests.
- Add e2e tests to check that examples works.

## [1.1.0] - 2019-10-27
### Added
- Add getLocalStorage command
- Add setLocalStorage command
- Add removeLocalStorage command
- Add acceptance tests

### Changed
- Improve documentation

## [1.0.0] - 2019-10-26
### Added
- Add saveLocalStorage command
- Add restoreLocalStorage command
- Add clearLocalStorageSnapshot command

## [1.0.0-alpha.1] - 2019-10-26
### Added
- Add package structure.
- Package still not functional.
- Reserve npm package name.

