const homeModel = require("../models/home.model");

exports.getHomes = async (req, res) => {
    const homes = await homeModel.aggregate([
        {
            $lookup: {
                from: "hrrents",
                localField: "_id",
                foreignField: "homeId",
                as: "rents",
            }
        },
        {
            $unwind: {
              path: "$rents",
              preserveNullAndEmptyArrays: true
            }
        },
        {
            $lookup: {
                from: "hrusers",
                localField: "rents.user",
                foreignField: "_id",
                as: "users"
            }
        },
        {
            $group: {
                _id: {
                    _id: "$_id",
                    description: "$description",
                    yearBuilt: "$yearBuilt",
                    bed: "$bed",
                    bath: "$bath",
                    image: "$image",
                    rentPerMonth: "$rentPerMonth",
                    status: "$status",
                },
                rents: { $addToSet: "$rents" },
                users: { $addToSet: "$users" },
            }
        }
    ]);
    res.send(homes);
}

exports.addHome = async (req, res) => {
    try {
        const { description, yearBuilt, bed, bath, rentPerMonth } = req.body;
        if (!description || !yearBuilt || !bed || !bath || !rentPerMonth) {
            return res.status(400).send({ error: "Missing required fields" });
        }
        const home = new homeModel(req.body);
        await home.save();
        res.send(home);
    }
    catch (err) {
        res.status(500).send({ error: "Internal server error" });
    }
}

exports.updateHome = async (req, res) => {
    try {
        const data = await homeModel.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
        res.send({ data });
    }
    catch (err) {
        res.status(500).send({ error: "Internal server error" });
    }
}

exports.deleteHome = async (req, res) => {
    try {
        const data = await homeModel.deleteOne({ _id: req.params.id });
        res.send({ data });
    }
    catch (err) {
        res.status(500).send({ error: "Internal server error" });
    }
}