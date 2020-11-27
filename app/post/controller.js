import {Model as Post} from './model.js'
const controller = {
    async find(req, res, next){
        try {
            const response = await Post.findAll({});
            res.send(response);
        } catch (err) {
            next(err);
        }
    },
    count(req, res, next){
        try {
            res.send({controller: 'post', query: req.query, params: req.params});
        } catch (err) {
            next(err);
        }
    },
    findOne(req, res, next){
        try {
            res.send({controller: 'post', query: req.query, params: req.params});
        } catch (err) {
            next(err);
        }
    },
    async create(req, res, next){
        try {
            await Post.sync({ alter: true })
            const response = await Post.create(req.body);
            res.status(201).json(response);
        } catch (err) {
            next(err);
        }
    },
    update(req, res, next){
        try {
            res.send({controller: 'post', query: req.query, params: req.params, body: req.body});
        } catch (err) {
            next(err);
        }
    },
    delete(req, res, next){
        try {
            res.send({controller: 'post', query: req.query, params: req.params});
        } catch (err) {
            next(err);
        }
    }
}
export default controller;