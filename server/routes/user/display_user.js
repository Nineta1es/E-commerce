const express = require("express");
const router = express.Router();
const { MongoClient, ObjectId } = require("mongodb");

const uri = "mongodb://127.0.0.1:27042/ionos";
const client = new MongoClient(uri);

router.get("/users", async (req, res) => {
    try {
        await client.connect();
        const db = client.db("ionos");
        const collection = db.collection("user");
    
        // Récupérer tous les utilisateurs de la collection "users"
        const users = await collection.find({}).toArray();
    
        res.status(200).json(users);
    } 
    catch (e) 
    {
        console.error("Erreur lors de la récupération des utilisateurs :", e);
        res.status(500).json({
            message:
            "Une erreur est survenue lors de la récupération des utilisateurs.",
        });
    }
});

module.exports = router;