import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import {combinedRoutes} from "../melirfan/utils/utils.js";
import category from "./category/controller.js";

const app = express()
const port = 3000

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// console.log(routes);
const routes = combinedRoutes()

routes.map((item)=> {
    app[item.method.toLowerCase()](item.path, category.find)
})

app.get('/', (req, res) => {
    res.send(routes)
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})