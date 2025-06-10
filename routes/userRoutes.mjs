import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { check, validationResult } from "express-validator";
import User from "../models/userSchema.mjs";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();


router.post(
    "/register",
    [
        check('username', 'Name Required').not().isEmpty(),
        check('email', "Need Valid Email").isEmail(),
        check('password', "Password Must Be 5 Characters or More").isLength({min: 5}),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }
        const {username, email, password} = req.body;

        try {
            let user = await User.findOne({ email });

            if (user) {
                return res.status(400).json({ errors: [{msg: "User Exists"}]});
            }
            user = new User({
                username,
                email,
                password,
            });
            const salt = await bcrypt.genSalt(10);
            user.password =await bcrypt.hash(password, salt);

            await user.save();

            const payload =
        }
    }
)

