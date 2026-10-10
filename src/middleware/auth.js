import jwt from "jsonwebtoken";
import c from "config";
import User from "../models/user.js";

export default async function Authorazation(req, res, next) {
  try {
    const token = req.headers.auth_token;
    const verify = await jwt.verify(token, c.get("jwt_secret"));
    const user = await User.findById(verify.id);
    req.user = user.id;
    next();
  } catch (error) {
    return res.status(401).json(error)
  }
}
