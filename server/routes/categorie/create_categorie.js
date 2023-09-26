const express = require("express");
const router = express.Router();
const { MongoClient, ObjectId } = require("mongodb");

const uri = "mongodb://127.0.0.1:27042/ionos";
const client = new MongoClient(uri);

router.post("/createCategorie", async (req, res) => {
    try 
    {
        await client.connect();
        const db = client.db("ionos");
        const collection = db.collection("categories");

        const categorie = {
            name: req.body.name,
        };

        await collection.insertOne(categorie);
        res.status(200).json({success: "Categorie created successfully!"});
    } 
    catch (e) 
    {
        console.log(e);
        res.status(500).send("An error occurred while creating the categorie.");
    }
});

module.exports = router