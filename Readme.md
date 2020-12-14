# **[HasteJS - A nodejs framework.](http://hastejs.com/)**
[![NPM](https://img.shields.io/npm/v/hastejs-cli.svg?style=flat-square)](https://www.npmjs.com/package/hastejs-cli)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://github.com/sultanfendonus/HasteJS/blob/main/LICENSE)

HasteJS is a NodeJs framework, built on top of ExpressJS, released as free and open-source software under the MIT Licence. It is particularly designed to develop a quick Restful API in record time.

`Note: HasteJS still not production-ready.`

**Details Docs:** http://hastejs.com

[![Netlify Status](https://api.netlify.com/api/v1/badges/96254405-9395-4994-9a7f-613ccfdfa563/deploy-status)](https://app.netlify.com/sites/hastejs/deploys)

**Node.js**\
HasteJs only requires Node.js. The current recommended version to run Haste is Node v14.

**Installation**\
`npm install -g create-haste-app hastejs-cli`

**Create A new HasteJs app**\
`create-haste-app my-app`\
`cd my-app`\
`npm install`\
`npm run develop`



**create a new module** \
`create-module moduleName`

_It will generate a new folder in app directory with routes, controllers and model._

**Update the model**\
HasteJs uses `sequelize` for managing database operations. now you need to 
update your `model.js` file to structure your table.
For more about sequelize model visit here: https://sequelize.org/master/manual/model-basics.html

**create a new middleware** \
`create-middleware middlewareName`

\
\
**License & copyright**\
© MD SULTAN MAHAMUD, Software Engineer\
Licensed under the [MIT License](LICENSE).