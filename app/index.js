import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path'
import {combinedRoutes} from "../haste/utils/utils.js";
import {CONTROLLER_MAPPER} from "./controllerMapper.js";
import {init} from '../database/index.js'
import {MIDDLEWARE_MAPPER} from "../middleware/middlewareMapper.js";
import {port} from "../config.js";

import { dirname } from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv'
dotenv.config()

const app = express()


app.set("view engine", "ejs");
const __dirname = dirname(fileURLToPath(import.meta.url));
app.set("views", path.join(__dirname,"../views"));


app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use( express.static( "public" ) );

//database init
init()

// console.log(routes);
const routes = combinedRoutes()

const appendMiddlewares = (middlewares)=> {
    let middlewareArray = []
    middlewares.forEach((item)=> {
        middlewareArray.push(MIDDLEWARE_MAPPER[item])
    })
    return middlewareArray;
}

routes.map((item)=> {
    const [controller, method] = item.controller.split('.');
    const middlewares = item.config['middleware']
    app[item.method.toLowerCase()](item.path, middlewares.length > 0 ? appendMiddlewares(middlewares): [],
        CONTROLLER_MAPPER[controller][method])
})

let debugMode = process.env.DEBUG_MODE || true;

if(debugMode === true || debugMode === 'true'){
    app.get("/", (req, res) => {
        res.render("homepage",{
            pageTitle: "HasteJs - Homepage",
            version: process.env.npm_package_version
        });
    });

    app.get("/api-docs", (req, res) => {
        res.render("api-docs",{
            pageTitle: "HasteJs - API Documentation",
            version: process.env.npm_package_version,
            api: routes,
            port: process.env.PORT_NUMBER || port
        });
    });
}


app.use((err, req, res, next) => {
    if (!err.statusCode) {
        err.statusCode = 500;
    }
    res.status(err.statusCode).send({ code: err.statusCode, error: err.message });
});


export const server = app.listen(process.env.PORT_NUMBER || port, () => {
    console.log(`Haste app listening at http://localhost:${process.env.PORT_NUMBER || port}`)
    console.log(`API docs at http://localhost:${process.env.PORT_NUMBER || port}/api-docs`)
    console.log(`Full HasteJs documentation at http://hastejs.com`)
})