const express = require("express");
const router = express.Router();
const { MongoClient, ObjectId } = require("mongodb");

const uri = "mongodb://127.0.0.1:27042/ionos";
const client = new MongoClient(uri);

router.post("/:id([0-9a-fA-F]{24})", async (req, res) => {
    try 
    {
        await client.connect();
        const db = client.db("ionos");
        const collection = db.collection("articles");
    
        const cursor = await collection
            .find({
                _id: new ObjectId(req.body.id),
            })
            .toArray();
    
        res.status(200).send(cursor);
    } 
    catch (e) 
    {
        console.log(e);
    }
});

module.exports = router