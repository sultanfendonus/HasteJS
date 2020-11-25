import {Category} from '../../database/models/category.js'
const controller = {
    async find(req, res, next){
        try {
            await Category.sync()
            const response = await Category.findAll({});
            res.send(response);
        } catch (err) {
            next(err);
        }
    },
    count(req, res, next){
        try {
            res.send({controller: 'category', query: req.query, params: req.params});
        } catch (err) {
            next(err);
        }
    },
    findOne(req, res, next){
        try {
            res.send({controller: 'category', query: req.query, params: req.params});
        } catch (err) {
            next(err);
        }
    },
    async create(req, res, next){
        try {

            await Category.sync()
            const response = await Category.create({
                title: req.body.title,
                description: req.body.description
            });

            res.status(201).json(response);
        } catch (err) {
            next(err);
        }
    },
    update(req, res, next){
        try {
            res.send({controller: 'category', query: req.query, params: req.params, body: req.body});
        } catch (err) {
            next(err);
        }
    },
    delete(req, res, next){
        try {
            res.send({controller: 'category', query: req.query, params: req.params});
        } catch (err) {
            next(err);
        }
    }
}
export default controller;