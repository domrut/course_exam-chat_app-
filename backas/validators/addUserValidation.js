const userDb = require("../schema/userSchema");

module.exports = async (req, res, next) => {
    const {username} = req.body;
    const user = await userDb.findOne({username})
    if(!user) return res.send({error: true, message: "user does not exist"})
    next()
}