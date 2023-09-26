const express = require("express");
const router = express.Router();
const { MongoClient, ObjectId } = require("mongodb");

const uri = "mongodb://127.0.0.1:27042/ionos";
const client = new MongoClient(uri);

router.post("/create", async (req, res) => {
    try {
        const db = client.db("ionos");
        const collection = db.collection("articles");

        console.log(req.body)
    
        const article = {
            name: req.body.name,
            description: req.body.description,
            picture: req.body.picture,
            categorie: req.body.categorie,
            brand: req.body.brand,
            status: req.body.status,
            promo: req.body.promo,
            stocks: req.body.stocks,
            comments: []
        };
    
        await collection.insertOne(article);
    } catch (e) {
        console.log(e);
    }
});

module.exports = router;