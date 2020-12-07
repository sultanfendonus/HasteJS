import {Model as Post} from './model.js'

const controller = {
    async find(req, res, next){
        try {
            let { limit, page } = req.query;
            if (!page || page < 0) {
                page = 0;
            }else {
                page = page - 1;
            }
            if (!limit || limit < 0) {
                limit = 10;
            }
            const response = await Post.findAll({
                limit: limit,
                offset: page * limit
            });

            const total = await Post.count();
            let totalPages = total / limit;
            totalPages = Math.ceil(totalPages);
            res.status(200).json({ totalItems: total, totalPages: totalPages, contents: response });
        } catch (err) {
            next(err);
        }
    },
    async count(req, res, next){
        try {
            const response = await Post.count({});
            res.json({total: response});
        } catch (err) {
            next(err);
        }
    },
    async findOne(req, res, next){
        try {
            const response = await Post.findOne({
                where: {
                    id: req.params.id
                }
            });
            if(response){
                res.send(response);
            }else {
                res.status(404).json({message: 'No item found!'})
            }
        } catch (err) {
            next(err);
        }
    },
    async create(req, res, next){
        try {
            const response = await Post.create(req.body);
            res.status(201).json(response);
        } catch (err) {
            next(err);
        }
    },
    async update(req, res, next){
        try {
            const response = await Post.update(req.body, {
                where: req.params
            });
            if(response[0] === 1){
                res.status(200).json({status: 'success', message: 'Item Updated!'});
            }else {
                res.status(400).json({message: 'Something went wrong when update the data!'})
            }

        } catch (err) {
            next(err);
        }
    },
    async delete(req, res, next){
        try {
            const response = await Post.destroy({
                where: req.params
            })
            if(response === 1){
                res.status(200).json({status: 'success', message: 'Item Deleted Successfully!'})
            }else {
                res.status(404).json({message: 'Item not found!'})
            }

        } catch (err) {
            next(err);
        }
    }
}
export default controller;