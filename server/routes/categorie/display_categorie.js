const express = require("express");
const router = express.Router();
const { MongoClient, ObjectId } = require("mongodb");

const uri = "mongodb://127.0.0.1:27042/ionos";
const client = new MongoClient(uri);

router.get("/displayCategorie", async (req, res) => {
    try 
    {
        await client.connect();
        const db = client.db("ionos");
        const collection = db.collection("categories");

        const cursor = await collection.find({}).toArray();
        res.status(200).send(cursor);
    } 
    catch (error) 
    {
        console.log(error);
    }
});

module.exports = router