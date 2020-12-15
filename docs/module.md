# Module

### What is Module in HasteJs?
In **HasteJs**, Modules are some smaller part of your entire project. 
You may want to divide your entire project into some modules so that
you can easily use these modules for your other hasteJs project easily.


### Create a new module
It is very easy to create a new module in your hasteJs project.
Just run below comand on your project root.

`npx create-module moduleName`

_It will generate a new folder in app directory with controllers,
model and routes._

```text
.
└── app
    └── moduleName
        ├── controller.js
        └── model.js
        └── routes.json
```
### Routes
Routes refer to how Rest API's endpoints respond to client requests.
When you create a new module, haste by default create some REST convention endpoint for you.
Here, You can add new endpoints or update old endpoints as your need.

```json
{
  "routes": [
    {
      "method": "GET",
      "path": "/category",
      "controller": "category.find",
      "config": {
        "middleware": []
      }
    },
    {
      "method": "GET",
      "path": "/category/count",
      "controller": "category.count",
      "config": {
        "middleware": []
      }
    },
    {
      "method": "GET",
      "path": "/category/:id",
      "controller": "category.findOne",
      "config": {
        "middleware": []
      }
    },
    {
      "method": "POST",
      "path": "/category",
      "controller": "category.create",
      "config": {
        "middleware": []
      }
    },
    {
      "method": "PUT",
      "path": "/category/:id",
      "controller": "category.update",
      "config": {
        "middleware": []
      }
    },
    {
      "method": "DELETE",
      "path": "/category/:id",
      "controller": "category.delete",
      "config": {
        "middleware": []
      }
    }
  ]
}
```
### Controller
Every route passes the request to the defined controller.
Controllers hold the business logic of your module.
Every route must define a controller. Controllers can communicate with the model and return data to the client or Error handlers.

```javascript
import {Model as Category} from './model.js'

const controller = {
    async count(req, res, next){
        try {
            const response = await Category.count({});
            res.json({total: response});
        } catch (err) {
            next(err);
        }
    },
}
export default controller;
```
The above code is responsible for the return count of the Category.

If you need to add a new function to your controller, you must add it to your routes.json file with the proper structure.

### Model
HasteJs uses `sequelize` for managing database operations. For
updating your model you need to update your `model.js` file to structure your table.
For more about sequelize model visit here: https://sequelize.org/master/manual/model-basics.html

Example model: 
```javascript
import {sequelize} from "../../database/index.js";
import DataTypes from 'sequelize';

export const Model = sequelize.define('Category', {
    // Model attributes are defined here
    // This are example attributes. please change as you want.
    // visit https://sequelize.org/master/manual/model-basics.html for details.

    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING
        // allowNull defaults to true
    }
}, {
    // Other model options go here
});
```
### Default Module
When you create a HasteJs project by [create-haste-app](https://www.npmjs.com/package/create-haste-app), A default User module will automatically generate for you in your app directory, So that you can focus on your main modules to develop your app in haste mode.
This default user module provides the following API

    - Login user
    - Register user
    - Count all users
    - Find Me
    - Find all users
    - Find Specific user.


