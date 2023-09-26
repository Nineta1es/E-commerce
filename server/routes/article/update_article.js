const express = require("express");
const router = express.Router();
const { MongoClient, ObjectId } = require("mongodb");

const uri = "mongodb://127.0.0.1:27042/ionos";
const client = new MongoClient(uri);

router.put("/update/:id", async (req, res) => {
    try {
        await client.connect();
        const db = client.db("ionos");
        const collection = db.collection("articles");
    
        await collection.updateOne(
            { _id: new ObjectId(req.params.id) },
            {
                $set: {
                    name: req.body.name,
                    description: req.body.description,
                    picture: req.body.picture,
                    categorie: req.body.categorie,
                    brand: req.body.brand,
                    status: req.body.status,
                    promo: req.body.promo,
                    stocks: req.body.stocks,
                    comments: req.body.comments,
                },
            }
        );
    } 
    catch (e) 
    {
      console.log(e);
    }
});
  
module.exports = router;