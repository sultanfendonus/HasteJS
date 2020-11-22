import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
// import Sequelize from 'sequelize';
import {combinedRoutes} from "../melirfan/utils/utils.js";
import {CONTROLLER_MAPPER} from "../melirfan/module/controller/mapper.js";

const app = express()
const port = 3000

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// const sequelize = new Sequelize('sqlite::memory:')
//
// try {
//     await sequelize.authenticate();
//     console.log('Connection has been established successfully.');
// } catch (error) {
//     console.error('Unable to connect to the database:', error);
// }

// console.log(routes);
const routes = combinedRoutes()

routes.map((item)=> {
    let [controller, method] = item.controller.split('.');
    app[item.method.toLowerCase()](item.path, CONTROLLER_MAPPER[controller][method])
})

app.get('/', (req, res) => {
    res.send(routes)
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})