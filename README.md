[![Build Status](https://travis-ci.org/mistaguy/gent.svg?branch=master)](https://travis-ci.org/mistaguy/gent)
[![Code Climate](https://img.shields.io/codeclimate/maintainability/mistaguy/gent.svg?style=flat-square)](https://codeclimate.com/github/mistaguy/gent)
[![Dependency Status](https://david-dm.org/mistaguy/gent.svg)](https://david-dm.org/mistaguy/gent)
[![Dev Dependency Status](https://david-dm.org/mistaguy/gent.svg#info=devDependencies)](https://david-dm.org/mistaguy/gent#info=devDependencies)
[![Known Vulnerabilities](https://snyk.io/test/github/mistaguy/gent.svg)](https://snyk.io/test/github/mistaguy/gent)
![Node 11](https://img.shields.io/badge/node-11.5.x-green.svg)
![Npm 6](https://img.shields.io/badge/npm-6.4.x-green.svg)
![Webpack 5](https://img.shields.io/badge/webpack-5.20.2-green.svg)
[![codecov](https://codecov.io/gh/mistaguy/gent/branch/master/graph/badge.svg)](https://codecov.io/gh/mistaguy/gent)
[![Coverage Status](https://coveralls.io/repos/github/mistaguy/gent/badge.svg?branch=master)](https://coveralls.io/github/mistaguy/gent?branch=master)
[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat-square)](https://github.com/mistaguy/gent/issues)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
[![code style: Tslint Latest](https://img.shields.io/badge/tslint_rules-latest-ff69b4.svg?style=flat-square)](https://github.com/buzinas/tslint-eslint-rules)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fmistaguy%2Fgent.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fmistaguy%2Fgent?ref=badge_shield)
[![MIT License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)](http://opensource.org/licenses/MIT)

# GENT
A GraphQL backend boilerplate for MongoDB  ExpressJs Typescript NodeJs App

<img src="https://dimitr.im/static/b876b338c35d14291bff2641e50262b6/ff9b8/apollo.png" height="50"> <img src="https://graphql.org/img/logo.svg" height="50"> <img src="https://i.cloudup.com/zfY6lL7eFa-300x300.png" height="50"> <img src="https://upload.wikimedia.org/wikipedia/en/thumb/4/45/MongoDB-Logo.svg/527px-MongoDB-Logo.svg.png" height="50"> <img src="https://worldvectorlogo.com/logos/nodejs-icon.svg" height="50"> <img src="https://camo.githubusercontent.com/66747a6e05a799aec9c6e04a3e721ca567748e8b/68747470733a2f2f662e636c6f75642e6769746875622e636f6d2f6173736574732f313336353838312f313931383337332f32653035373166612d376462632d313165332d383436352d3839356632393164343366652e706e67" height="50">

## Issues, suggestions and feature requests
We are actively maintaining this boilerplate, please report any issues or suggestion for improvement at https://github.com/mistaguy/gent/issues

## Development and contribution
Prerequisite: Install git, node package manager, webpack CLI, grunt CLI

To contribute, fork and clone.

    > git clone https://github.com/mistaguy/gent.git

The code is in typescript. Use a typescript IDE of your choice, like Visual Studio Code or WebStorm.

To set up the development environment, run:

    > npm install

To automatically compile, bundle and push code changes to the running test project, run:

    > npm start

To run the project unit tests with code coverage, results can be found at `dist/testresults/coverage/index.html`, run:

    > npm run test:unit

Run the unit test continuously during development:

    > npm run test:dev

Run the end to end test during development:

    > npm run test:e2e:dev

## Scripts
While developing, you will probably rely mostly on `npm start`; however, there are additional scripts at your disposal:

|`npm run <script>`|Description|
|------------------|-----------|
|`start`|Build the project and monitor source and config for changes and rebuild. Start the dev server|
|`watch`|Build the project and monitor source and config for changes and rebuild.|
|`prod:server:start`|starts the application in production as daemon and restart it in case of crashes|
|`prod:server:stop`|stop an instance of the application running|
|`emit`|Output javascript code|
|`test`|Runs lint, build, unit tests with mocha and generates a coverage report|
|`test:dev`|Runs mocha and watches for changes to re-run tests; does not generate coverage reports.|
|`test:unit`|Runs unit tests with mocha and generates a coverage report.|
|`build:prod`|Build app optimized for production|
|`build:dev`|Build app optimized for debugging.|
|`lint`|Lint all `.js` files.|
|`lint:fix`|Lint and fix all `.ts` files.|

