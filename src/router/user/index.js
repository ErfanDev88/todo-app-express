import { Router } from "express";
import Authorazation from "../../middleware/auth.js";
import User from "../../models/user.js";


const user = Router()

user.use(Authorazation)

user.get("/", async (req, res)=>{
    const user = await User.findById(req.user)
    res.json(user)
})

export default user