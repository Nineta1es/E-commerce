const express = require("express");
const router = express.Router();
const { MongoClient, ObjectId } = require("mongodb");

const uri = "mongodb://127.0.0.1:27042/ionos";
const client = new MongoClient(uri);

router.post("/find/size", async (req, res) => {
    try
    {
        await client.connect();
        const db = client.db("ionos");
        const articles = db.collection("articles");

        const cursor = await articles.find({
            _id: new ObjectId(req.body.id),
        }).toArray()

        res.status(500).send(cursor[0].stocks[req.body.size]);
    }
    catch(e)
    {
        console.log(e)
    }
})

module.exports = router