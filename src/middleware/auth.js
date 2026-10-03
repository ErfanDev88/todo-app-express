import jwt from "jsonwebtoken"
import c from "config"
import User from "../models/user.js"


export default async function Authorazation(req, res, next){
    const token = req.headers.auth_token
    if(!token) return res.status(401).send("Unathorized")
    console.log(token)
    const verify = await jwt.verify(token, c.get("jwt_secret"))
    if(!verify) return res.status(401).send("Unathorized")
    const user = await User.findById(verify.id)
    if(!user) return res.status(401).send("Unathorized")

    req.user = user.id
    next()
}