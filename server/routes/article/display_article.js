const express = require("express");
const router = express.Router();
const { MongoClient, ObjectId } = require("mongodb");

const uri = "mongodb://127.0.0.1:27042/ionos";
const client = new MongoClient(uri);

router.post("/display", async (req, res) => {
    
    try {
        await client.connect();
        const db = client.db("ionos");
        const collection = db.collection("articles");
    
        if (req.body.categorie !== null) 
        {
            var cursor = await collection
            .find({ categorie: req.body.categorie })
            .toArray();
        } 
        else if (req.body.name !== null) 
        {
            var cursor = await collection
            .find({ name: { $regex: req.body.name } })
            .toArray();
        } 
        else 
        {
            var cursor = await collection.find({}).toArray();
        }
        
        if (req.body.categorie !== null && req.body.name !== null) 
        {
            var cursor = await collection
            .find({
                categorie: req.body.categorie,
                name: { $regex: req.body.name },
            })
            .toArray();
        } 
    
        res.status(200).send(cursor);
    } 
    catch (error) 
    {
        console.log(error);
    }
});

module.exports = router