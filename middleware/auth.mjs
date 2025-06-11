import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export default function (req, res, next){
    let token = req.header("token");

    if (!token) {
        return res.status(401).json({msg: "Auth Denied"})
    }
    try {
        const decoded = jwt.verify(token, process.env.jwtSecret);
        req.user = decoded.user.id;
        next();
    } catch (error) {
        console.log(error.message);
        res.status(401).json({msg: "Invalid Token"})
    }
}
