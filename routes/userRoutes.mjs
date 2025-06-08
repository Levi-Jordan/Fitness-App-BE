import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { check, validationResult } from "express-validator";
import User from "../models/userSchema.mjs"

const router = express.Router();


router.post(
    "/",
    [
        check('username', 'Name Required').not().isEmpty(),
        check('email', "Need Valid Email").isEmail(),
        check(
            'password',
            "Password Must Be 5 Characters or More"
        ).isLength({min: 5}),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }
        const {username, email, password} = req.body;

        
    }
)

