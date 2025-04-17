const rentModel = require("../models/rent.model");
const moment = require("moment");
const homeModel = require("../models/home.model");

// Bonus Complex-Query-1
exports.getRents = async (req, res) => {
    const rents = await rentModel.aggregate([
        {
            $lookup: {
                from: "hrhomes",
                localField: "homeId",
                foreignField: "_id",
                as: "home"
            }
        },
        {
            $lookup: {
                from: "hrusers",
                localField: "user",
                foreignField: "_id",
                as: "bookedBy"
            }   
        },
        {
            $lookup: {
                from: "hrpayments",
                localField: "_id",
                foreignField: "rentId",
                as: "payments"
            }   
        },
    ]);
    res.send(rents);
}

exports.getOnRents = async (req, res) => {
    const { homeId } = req.params;
    const onrents = await rentModel.find({ homeId });
    res.send(onrents);
}

exports.deleteRent = async (req, res) => {
    const data = await rentModel.findOneAndDelete({ _id: req.params.id });
    res.send({ data });
}

exports.updateRent = async (req, res) => {
    const data = await rentModel.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
    res.send({data})
}

exports.createRent = async (req, res) => {
    try {

        if (!req.user) {
            return res.status(401).send({ error: "Authentication required" })
        }

        const { homeId  } = req.body;

        // status false means home is not on rent
        const isHomeTaken = await rentModel.findOne({ status: true, homeId });

        if (!isHomeTaken) {
            const rent  = new rentModel({
                homeId,
                start: Date.now(),
                user: req.user,
                months: req.body.months
            });
            homeModel.updateOne({id: homeId}, { status: true });
            const data = await rent.save();
            res.send({ data });
        }
        else {
            res.status(400).send({ error: "Home is booked already" });
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).send({ error: "Internal server error" });
    }
}