import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import {combinedRoutes} from "../haste/utils/utils.js";
import {CONTROLLER_MAPPER} from "../haste/module/controller/mapper.js";
import {init} from '../database/index.js'
import {MIDDLEWARE_MAPPER} from "../middleware/middlewareMapper.js";


const app = express()
const port = 4895

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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

app.get('/', (req, res) => {
    res.send(routes)
})

app.use((err, req, res, next) => {
    if (!err.statusCode) {
        err.statusCode = 500;
    }
    res.status(err.statusCode).send({ code: err.statusCode, error: err.message });
});


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})