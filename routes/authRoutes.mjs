import express from "express";
import User from "../models/userSchema.mjs";
import auth from "../middleware/auth.mjs";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { check, validationResult } from "express-validator"