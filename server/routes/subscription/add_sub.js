const express = require("express");
const router = express.Router();
const { MongoClient, ObjectId } = require("mongodb");

const uri = "mongodb://127.0.0.1:27042/ionos";
const client = new MongoClient(uri);

router.post("/abonnement/add", async (req, res) => {
    try 
    {
        await client.connect();
        const db = client.db("ionos");
        const collection = db.collection("user");
    
        subscribetable = [];
  
        subscribetable.push({
            status: true,
            startDate: new Date().toLocaleDateString("fr-FR"),
            endDate: new Date(
                new Date().setFullYear(new Date().getFullYear() + 1))
            .toLocaleDateString("fr-FR"),
        });

        await collection.updateOne(
            { _id: new ObjectId(req.body.id) },
            {
                $set: {
                    subscribe: subscribetable,
                },
            }
        );
    } 
    catch (e) 
    {
        console.log(e);
    }
});

module.exports = router