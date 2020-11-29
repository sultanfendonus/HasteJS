import {Model as User} from './model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const controller = {
    async find(req, res, next){
        try {
            const response = await User.findAll({});
            res.send(response);
        } catch (err) {
            next(err);
        }
    },
    async count(req, res, next){
        try {
            const response = await User.count({});
            res.json({total: response});
        } catch (err) {
            next(err);
        }
    },
    async findOne(req, res, next){
        try {
            const response = await User.findOne({
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
            // const response = await User.create(req.body);
            // res.status(201).json(response);
            bcrypt.genSalt(10, function (err, salt) {
                bcrypt.hash(req.body.password, salt, async function (err, hash) {
                    //data insert
                    let response;
                    try {
                        response = await User.create({
                            first_name: req.body.first_name,
                            last_name: req.body.last_name,
                            email: req.body.email,
                            password: hash,
                        });
                    } catch (e) {
                        next(e);
                    }

                    const token = jwt.sign(
                        {
                            email: response.email,
                            user_id: response.id
                        },
                        'secretssh'
                    );

                    res.status(201).json({
                        email: req.body.email,
                        first_name: req.body.first_name,
                        last_name: req.body.last_name,
                        token: token
                    });
                });
            });
        } catch (err) {
            next(err);
        }
    },
    async update(req, res, next){
        try {
            const response = await User.update(req.body, {
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
            const response = await User.destroy({
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