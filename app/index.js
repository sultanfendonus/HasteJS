import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import {routes} from "./post/routes.js";

const app = express()
const port = 3000

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// console.log(routes);

routes.routes.map((item)=> {
    app[item.method.toLowerCase()](item.path, (req, res) => {
        res.send(item.controller)
    })
})

app.get('/', (req, res) => {
    res.send(routes)
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})