import mongoose from "mongoose";
import express from "express";
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
        check('password', "Password Must Be 5 Characters or More").isLength({ min: 5 }),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { username, email, password } = req.body;

        try {
            let user = await User.findOne({ email });

            if (user) {
                return res.status(400).json({ errors: [{ msg: "User Exists" }] });
            }
            user = new User({
                username,
                email,
                password,
            });
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);

            await user.save();

            const payload = {
                user: { id: user._id, }
            }
            jwt.sign(payload, process.env.jwtSecret, { expiresIn: 3600 },
                (err, token) => {
                    if (err) throw err;
                    res.status(201).json({ token });
                }
            )
        } catch (err) {
            console.error(err);
            res.status(500).json({ errors: [{ msg: "Server Error" }] })

        }
    }
)

router.post(
    "/login",
    [
        check('email', "Need Valid Email").isEmail(),
        check('password', "Password Required").exists(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { email, password } = req.body;
        try {
            const user = await User.findOne({ email });

            if (!user) {
                return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
            }
            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) { return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] }); }
            const payload = {
                user: { id: user._id, }
            }
            jwt.sign(payload, process.env.jwtSecret, { expiresIn: 3600 },
                (err, token) => {
                    if (err) throw err;
                    res.status(201).json({ token });
                }
            )
        } catch (err) {
            console.error(err);
            res.status(500).json({ errors: [{ msg: "Server Error" }] })

        }
    }     
)


export default router;

