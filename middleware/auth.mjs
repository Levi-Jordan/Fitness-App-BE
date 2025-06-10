import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export default function (req, res, next){
    let token =req.header("token");

    if (!token) {
        res.status(401).json({"Auth Denied"})
    }
}