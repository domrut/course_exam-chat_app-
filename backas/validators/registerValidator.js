const userDb = require("../schema/userSchema");

module.exports = async (req, res, next) => {
    const {username, password} = req.body;
    const regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).+$/;
    if (username.length < 4 || username.length > 20) return res.send({error: true, message: "Username must be between 4 and 20 characters"})
    if (password.length < 4 || password.length > 20) return res.send({error: true, message: "Password must be between 4 and 20 characters"})
    if (!regex.test(password)) return res.send({error: true, message: "Password must have at least one capital letter and one special symbol"})
    const user = await userDb.findOne({username})
    if(user) return res.send({error: true, message: "user already exists"})
    next()
}