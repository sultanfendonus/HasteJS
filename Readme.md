# **HasteJS - A nodejs framework.**

HasteJS is a NodeJs framework, built on top of ExpressJS, released as free and open-source software under the MIT Licence. It is particularly designed to develop a quick Restful API in record time.

`Note: HasteJS still not production-ready.`

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
