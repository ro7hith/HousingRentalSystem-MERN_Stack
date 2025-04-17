const PaymentModel = require("../models/payments.model")

exports.getPayments = async (req, res) => {
    const payments = await PaymentModel.find({});
    res.send(payments);
};

exports.pay = async (req, res) => {
    const { amount, rentId } = req.body;
    if (amount && rentId) {
        const payment = PaymentModel(req.body);
        const data = await payment.save();
        res.send({ data });
    }
    else {
        return res.status(400).send({ error: "Required fields are not provided" });
    }
};

exports.updatePayment = async (req, res) => {
    const data = await PaymentModel.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
    res.send({ data });
};

exports.deletePayment = async (req, res) => {
    const data = await PaymentModel.findOneAndDelete({ _id: req.params.id });
    res.send({ data });
}
