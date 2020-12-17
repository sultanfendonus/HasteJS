import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path'
import {combinedRoutes} from "../haste/utils/utils.js";
import {CONTROLLER_MAPPER} from "./controllerMapper.js";
import {init} from '../database/index.js'
import {MIDDLEWARE_MAPPER} from "../middleware/middlewareMapper.js";

import { dirname } from 'path';
import { fileURLToPath } from 'url';


const app = express()


app.set("view engine", "ejs");
const __dirname = dirname(fileURLToPath(import.meta.url));
app.set("views", path.join(__dirname,"../views"));


const port = 4999

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

// app.get('/', (req, res) => {
//     res.send(routes)
// })

app.get("/", (req, res) => {
    res.render("homepage",{
        pageTitle: "HasteJs - Homepage",
        version: process.env.npm_package_version
    });
});

app.use((err, req, res, next) => {
    if (!err.statusCode) {
        err.statusCode = 500;
    }
    res.status(err.statusCode).send({ code: err.statusCode, error: err.message });
});


export const server = app.listen(port, () => {
    console.log(`Haste app listening at http://localhost:${port}`)
})