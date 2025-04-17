const mongoose = require("mongoose");

const homeSchema = mongoose.Schema({
    description: {
        type: String,
        required: true,
    },
    yearBuilt: {
        type: Number,
        required: true,
    },
    bed: {
        type: Number,
        required: true,
    },
    bath: {
        type: Number,
        default: null,
    },
    image: {
        type: String,
        default: ""
    },
    rentPerMonth: {
        type: Number,
        default: 0,
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model("hrhome", homeSchema);
