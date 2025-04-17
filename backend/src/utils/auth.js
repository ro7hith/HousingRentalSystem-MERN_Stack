const { verify } = require("jsonwebtoken");
const UserModel = require("../models/user.model");

async function authMiddleware (req, res, next) {
    try {
        const token = (req.headers.authorization || "").split(" ")[1];
        const data = verify(token || "", process.env.JWT_KEY);
        const {id: userId}= data;
        if (userId) {
            const user = await UserModel.findOne({ _id: userId });
            req.user = user;
        }
        else {
            delete req.user;
        }
        next();
    }
    catch (err) {
        delete req.user;
        next();
    }
}

module.exports = authMiddleware;