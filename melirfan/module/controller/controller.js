import {Model as UPPER} from './model.js'
const controller = {
    async find(req, res, next){
        try {
            const response = await UPPER.findAll({});
            res.send(response);
        } catch (err) {
            next(err);
        }
    },
    count(req, res, next){
        try {
            res.send({controller: 'REPLACE_ME', query: req.query, params: req.params});
        } catch (err) {
            next(err);
        }
    },
    findOne(req, res, next){
        try {
            res.send({controller: 'REPLACE_ME', query: req.query, params: req.params});
        } catch (err) {
            next(err);
        }
    },
    async create(req, res, next){
        try {
            const response = await UPPER.create(req.body);
            res.status(201).json(response);
        } catch (err) {
            next(err);
        }
    },
    update(req, res, next){
        try {
            res.send({controller: 'REPLACE_ME', query: req.query, params: req.params, body: req.body});
        } catch (err) {
            next(err);
        }
    },
    delete(req, res, next){
        try {
            res.send({controller: 'REPLACE_ME', query: req.query, params: req.params});
        } catch (err) {
            next(err);
        }
    }
}
export default controller;