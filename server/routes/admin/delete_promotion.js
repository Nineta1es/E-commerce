const express = require("express");
const router = express.Router();
const { MongoClient, ObjectId } = require("mongodb");

const uri = "mongodb://127.0.0.1:27042/ionos";
const client = new MongoClient(uri);

router.delete("/deletePromotion", async (req, res) => {
    try
    {
        await client.connect();
        const db = client.db("ionos");
        const promotions = db.collection("promotion");

        const promotion = {
            startDate: null,
            endDate: null,
            percent: null
        };

        promotions.deleteOne({});

        promotions.insertOne(promotion)

        res.status(200).json({ success: true, message: "Promotion supprimée." })
    }
    catch(e)
    {
        console.log(e)
    }
})

module.exports = router