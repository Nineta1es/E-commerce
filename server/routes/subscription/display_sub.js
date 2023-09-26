const express = require("express");
const router = express.Router();
const { MongoClient, ObjectId } = require("mongodb");

const uri = "mongodb://127.0.0.1:27042/ionos";
const client = new MongoClient(uri);

router.post("/abonnement/display", async (req, res) => {
    try 
    {
        await client.connect();
        const db = client.db("ionos");
        const collection = db.collection("user");
        const cursor = await collection.find({
            _id: new ObjectId(req.body.id),
        }).toArray();
        const subscribe = cursor[0].subscribe;

        res.status(200).send(subscribe[0]);
    } 
    catch (err) 
    {
        console.log(err);
    }
});

module.exports = router;