const mongoose = require("mongoose");

const userModel = mongoose.Schema({
    name: {
        required: true,
        type: String,
    },
    password: {
        required: true,
        type: String,
    },
    email: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        unique: [true, "Username is already taken"]
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model("hruser", userModel);
