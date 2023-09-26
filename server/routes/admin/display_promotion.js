const express = require("express");
const router = express.Router();
const { MongoClient, ObjectId } = require("mongodb");

const uri = "mongodb://127.0.0.1:27042/ionos";
const client = new MongoClient(uri);

router.get("/displayPromotion", async (req, res) => {
    try
    {
        await client.connect();
        const db = client.db("ionos");
        const promotions = db.collection("promotion");

        const cursor = await promotions.find({}).toArray();
        
        res.status(200).json({result: cursor[0]})
    }
    catch(e)
    {
        console.log(e)
    }
})

module.exports = router