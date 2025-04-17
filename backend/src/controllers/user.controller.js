const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

exports.getMyRents = async (req, res) => {
    if (req.user) {
        const user = await userModel.aggregate([
            {
                $match: {
                    _id: req.user ? req.user._id : ""
                }
            },
            {
                $lookup: {
                    from: "hrrents",
                    localField: "_id",
                    foreignField: "user",
                    as: "rents"
                }
            },
            {
                $unwind: {
                    path: "$rents",
                    preserveNullAndEmptyArrays: true,
                }
            },
            {
                $lookup: {
                    from: "hrhomes",
                    localField: "rents.homeId",
                    foreignField: "_id",
                    as: "homes",
                } 
            },
            {
                $group: {
                    _id: {
                        id: "$id",
                        username: "$username",
                        email: "$email",
                        name: "$name",
                    },
                    rents: { $addToSet: "$rents" },
                    homes: { $addToSet: "$homes" },
                }
            }
        ])
        res.send(user);
    }
    else {
        res.status(401).send({ error: "Login to continue" });
    }
}

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await userModel.findOne({ username, password });
        if (user) {
            res.send({
                ...user._doc,
                token: jwt.sign({ id: user.id }, process.env.JWT_KEY),
            });
        }
        else {
            res.status(401).send({
                error: "Wrong username or password",
            });
        }
    }
    catch (err) {
        res.status(500).send({ error: "Internal server error" });
    }
}

exports.getUser = async (req, res) => {
    try {
        const user = await userModel.findOne({ username: req.params.username });
        res.send({ data: user });
    }
    catch (error) {
        res.status(400).send({ error })
    }
}

exports.registerUser = async (req, res) => {
    try {

        const { username, email, name, password } = req.body;
        if (!username || !email || !name || !password) {
            return res.status(400).send({ error: "Missing required fields" });
        }
        const user = new userModel(req.body);
        await user.save();
        res.send({ data: user });
    }
    catch (error) {
        if (error.code === 11000) {
            return res.status(400).send({ error: "This username is already taken" });
        }
        else {
            console.log(error)
            res.status(500).send({ error: "Internal server error" });
        }
    }
}

exports.updateUser = async (req, res) => {
    if (req.user) {
        const data = await userModel.findOneAndUpdate({ _id: req.user._id }, req.body, { new: true });
        res.send({ data });
    }
    else {
        res
            .status(401)
            .send({ error: "User not found" });
    }
}

exports.deleteUser = async (req, res) => {
    if (req.user) {
        const data = await userModel.findOneAndDelete({ _id: req.user._id });
        res.send({ data });
    }
    else {
        res.status(401).send({ "error": "User not found" });
    }
};