const mongoose = require("mongoose");

const paymentSchema = mongoose.Schema({
    rentId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model("hrpayment", paymentSchema);
