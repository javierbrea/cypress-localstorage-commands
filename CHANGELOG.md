# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [unreleased]
### Added
### Changed
### Fixed
### Removed
### BREAKING CHANGES

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

