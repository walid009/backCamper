const { Share } = require("../models/share.model");
const { Like } = require("../models/like.model");
const mongoose = require("mongoose");

module.exports = {
    getAllShareEvent: async (req, res) => {
        const shares = await Share.find();
        res.send(shares);
    },
    // createEvent: async (req, res) => {
    //     const { titre, description, Longitude, Latitude, emailcreateur, emailpartageur, date, image } = req.body;
    //     console.log(req.body)
    //     const share = new Share({ titre, description, Longitude, Latitude, emailcreateur, emailpartageur, date, image});
    //     await share.save();
    //     res.send(share);
    // },
    createEvent: async (req, res) => {
        const { titre, description, date, image } = req.body;
        console.log(req.body)
        const share = new Share({ titre, description, date, image });
        await share.save();
        res.send(share);
    },
    CheckLikeOrUnlikeAndUpdate: async (req, res) => {
        const { _id } = req.body
        const { emailcampeur } = req.body
        const userlikeIsFound = await Like.findOne({ idEvent: _id, emailcampeur });
        console.log(userlikeIsFound)
        if (userlikeIsFound) {
            if (userlikeIsFound.like) {
                const like = { like: false }
                await Like.findByIdAndUpdate(userlikeIsFound._id, like)
                console.log("dislike")
            } else {
                const like = { like: true }
                await Like.findByIdAndUpdate(userlikeIsFound._id, like)
                console.log("like")
            }
        } else {
            console.log(req.body);
            const like = new Like({
                idEvent: _id,
                emailcampeur,
                like: true
            });
            await like.save();
        }
        return res.send("finished set");
    },

    countLikeAndReturnIsliked: async (req, res) => {
        const { _id } = req.params
        const { emailcampeur } = req.params
        console.log("hello")
        const count = await Like.countDocuments({ idEvent: _id, like: true })
        const userlikeIsFound = await Like.findOne({ idEvent: _id, emailcampeur });
        console.log("count=" + count)
        console.log(userlikeIsFound)
        if (userlikeIsFound) {
            return res.json({ count: count, isliked: userlikeIsFound.like });
        } else {
            return res.json({ count: count, isliked: false });
        }
    },
};