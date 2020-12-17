import {Model as User} from './model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {jwtSecretKey} from "../../config.js";

const controller = {
    async find(req, res, next){
        try {
            const response = await User.scope("withoutPassword").findAll({});
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
            const response = await User.scope("withoutPassword").findOne({
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
    async findMe(req, res, next){
        try {
            const response = await User.scope("withoutPassword").findOne({
                where: {
                    id: req.user_id
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
                        jwtSecretKey
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
    async login(req, res, next){
        try{
            const user = await User.findOne({
                where: { email: req.body.email }
            });
            if (user) {
                bcrypt.compare(req.body.password, user.password, async function (err, result) {
                    // res === true
                    if (result === true) {
                        const token = jwt.sign(
                            {
                                email: user.email,
                                user_id: user.id
                            },
                            jwtSecretKey
                        );

                        const userData = await User.scope('withoutPassword').findOne({
                            where: { email: req.body.email }
                        });

                        res.status(200).json({
                            user: userData,
                            token: token
                        });
                    } else {
                        res
                            .status(401)
                            .json({ errors: [{ msg: 'Invalid email or password!' }] });
                    }
                });
            } else {
                res.status(401).json({ errors: [{ msg: 'Invalid email or password!' }] });
            }
        }catch (err){
            next(err)
        }
    }
}
export default controller;