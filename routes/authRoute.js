import { Router } from "express";
import { check, validationResult } from "express-validator";
// import jsonwebtoken from 'jsonwebtoken';
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import config from "config";

// export const router = Router();
const authRouter = Router();

authRouter.post(
  "/register",
  [
    check("email", "wrong email").isEmail(),
    check("password", "wrong password").isLength({ min: 6 }),
  ],
  async (req, res) => {
    try {
      console.log("Body", req.body);

      const errors = validationResult(req);

      if (errors) {
        return res.status(400).send({
          errors: errors.array(),
          message: "Invalid register credentials",
        });
      }

      const { email, password } = req.body;

      const candidate = await User.findOne({ email });
      if (candidate) {
        return res.status(400).send({ message: "User already registered" });
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      const user = new User({ email, password: hashedPassword });
      await user.save();
      return res.status(200).send({ message: "User successfully registered" });
    } catch (error) {
      res.status(500).send({ error: error });
      console.error(error);
    }
  }
);
authRouter.post(
  "/login",
  [
    check("email", "wrong email").normalizeEmail().isEmail(),
    check("password", "wrong password").exists(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (errors) {
        return res.status(400).send({
          errors: errors.array(),
          message: "Invalid login credentials",
        });
      }

      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).send({ message: "No user with this email" });
      }

      const isMatch = bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).send({ message: "Invalid password, try" });
      }

      const token = jwt.sign({ userId: user.id }, config.get("jwtSecretKey"), {
        expiresIn: "1h",
      });
      res.send({ token, userId: user.id });
    } catch (error) {
      res.status(500).send({ error: error });
      console.error(error);
    }
  }
);

export default authRouter;
