const express = require("express");
const router = express.Router();
const { MongoClient, ObjectId } = require("mongodb");

const uri = "mongodb://127.0.0.1:27042/ionos";
const client = new MongoClient(uri);

let ts = Date.now();

let date_time = new Date(ts);
let day = date_time.getDate();
let month = date_time.getMonth() + 1;
let year = date_time.getFullYear();

router.post("/promotion", async (req, res) => {
    try
    {
        await client.connect();
        const db = client.db("ionos");
        const promotions = db.collection("promotion");

        const promotion = {
            startDate: year + "-" + month + "-" + day || req.body.start,
            endDate: req.body.end,
            percent: req.body.percent
        }

        promotions.deleteOne({});

        promotions.insertOne(promotion);

        res.status(200).json({ success: true, message: "Période de promotion crée !" })
    }
    catch(e)
    {
        console.log(e)
    }
})

module.exports = router