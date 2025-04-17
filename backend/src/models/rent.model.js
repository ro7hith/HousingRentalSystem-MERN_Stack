const mongoose = require("mongoose");

const rentSchema = mongoose.Schema({
    homeId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    start: {
        type: Date,
    },
    end: {
        type: Date,
    },
    months: {
        type: Number,
    },
    status: {
        type: Boolean,
        default: true,
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("hrrent", rentSchema);
