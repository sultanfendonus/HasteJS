import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import {combinedRoutes} from "../melirfan/utils/utils.js";
import {CONTROLLER_MAPPER} from "../melirfan/module/controller/mapper.js";
import {init} from '../database/index.js'

const app = express()
const port = 3000

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//database init
init()

// console.log(routes);
const routes = combinedRoutes()

routes.map((item)=> {
    const [controller, method] = item.controller.split('.');
    app[item.method.toLowerCase()](item.path, CONTROLLER_MAPPER[controller][method])
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