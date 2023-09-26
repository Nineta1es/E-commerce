const express = require("express");
const router = express.Router();
const { MongoClient, ObjectId } = require("mongodb");

const uri = "mongodb://127.0.0.1:27042/ionos";
const client = new MongoClient(uri);

router.post('/displayHistory', async (req, res) => {
    try
    {
        await client.connect();
        const db = client.db("ionos");
        const history = db.collection("history");
        
        const cursor = await history.find({ userId: req.body.userid }).toArray()

        res.status(200).send(cursor)
    }
    catch(e)
    {
        console.log(e)
    }
})

module.exports = router