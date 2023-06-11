const jwt = require("jsonwebtoken");
require("dotenv").config();
const ACCESS_SECRET = process.env.ACCESS_SECRET;
const User = require("../schema/userSchema");
const auth = async (req, res, next) => {
    try {
        const token = req.body.token;
        const decoded = jwt.verify(token, ACCESS_SECRET)
        const user = await User.findOne({username: decoded})
        if (!user) {
            throw new Error()
        }
        req.token = token
        req.user = user
        next()
    } catch (e) {
        return res.status(401).send({ error: 'Please authenticate.' })
    }
}
module.exports = auth