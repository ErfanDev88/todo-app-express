import _ from "lodash";
import User from "../../models/user.js";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import config from 'config'

export const register = async (req, res) => {
  let body = _.pick(req.body, ["email", "password"]);
  const exist = await User.findOne({ email: body.email });
  if (exist) return res.status(400).send("Email already exists");

  const saltRound = 10;
  body.password = await bcrypt.hash(body.password, saltRound);
  const newUser = await User.create(body);
  res.json({
    msg: "user created",
    data: _.pick(newUser, ["email"]),
  });
};

export const login = async (req, res) => {
  const body = _.pick(req.body, ["email", "password"]);

  const exist = await User.findOne({ email: body.email });
  if (!exist) return res.status(400).send("Invalid Data");

  const check = await bcrypt.compare(body.password, exist.password)
  if(!check) return res.status(404).send("Invalid Data");

  const payload = {id: exist.id}
  const token = await jsonwebtoken.sign(payload, config.get("jwt_secret"))

  return res.json({
    msg:"login completed",
    token: token
  })

};
