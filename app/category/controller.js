// import models from '../../models/index.js';
const controller = {
    find(req, res, next){
        try {
            res.send({controller: 'category', query: req.query, params: req.params});
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
            // const response = await models.myuser.create({
            //     first_name: 'sultan',
            //     last_name: 'mahamud',
            //     bio: 'great teacher'
            // });

            res.status(201).json('response');
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