import jwt from 'jsonwebtoken';
import {jwtSecretKey} from "../config.js";

const isLoggedIn = (req,res,next) => {
    if(!req.get('Authorization')){
        const error = new Error("Unauthorized User!");
        error.statusCode = 401;
        throw error;
    }
    let token = req.get('Authorization').split(" ")[1];
    let decodedToken;
    try{
        decodedToken = jwt.verify(token, process.env.JWT_SECRET || jwtSecretKey);
        if(!decodedToken){
            const error = new Error("Unauthorized User!")
            error.statusCode = 403;
            throw error;
        }
        req.user_id = decodedToken.user_id
        req.user_email = decodedToken.email
        next()
    }catch (e) {
        const error = new Error("Unauthorized User!")
        error.statusCode = 403;
        next(error)
    }
}

export default isLoggedIn;