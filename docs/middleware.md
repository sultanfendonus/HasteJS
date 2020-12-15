# Middleware

### What is middleware? 
Middleware is a piece of code or functions that have access to the
request object (req), the response object (res), and the next middleware
function in the application’s request-response cycle. The next middleware
function is commonly denoted by a variable named next.
More about middleware visit [ExpressJS Middleware](https://expressjs.com/en/guide/using-middleware.html)

In a general sense, you will need a middleware when
you want to verify the request and do some stuff with the request
before the controller function execute.
You can define one or multiple middlewares in every route.

`create-haste-app` automatically generates "isLoggedIn"
middleware for you in `app -> middleware` folder. 
This middleware verifies the JW token and passes the request
to the controller or error handlers. You can use this middleware 
on any of your routes to secure the route.

Here user count route is secured by `isLoggedIn` middleware. You can add multiple
middleware in middleware array.

```json
{
      "method": "GET",
      "path": "/user/count",
      "controller": "user.count",
      "config": {
        "middleware": ["isLoggedIn"]
      }
    }
```

You can generate a new middleware for your need. Here is the shortcut way-

**Create a new middleware** \
`npx create-middleware middlewareName`

_It will generate a new middleware file for you._

```text
.
└── middleware
    ├── isLoggedIn.js
    └── middlewareName.js
```
```javascript
const middlewareName = (req,res,next) => {
    try{
        next();
    }catch (e) {
        next(error);
    }
}

export default middlewareName;
```