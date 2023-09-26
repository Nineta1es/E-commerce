const express = require("express");
const router = express.Router();
const { MongoClient } = require("mongodb");
const bcrypt = require("bcrypt");

const uri = "mongodb://127.0.0.1:27042/ionos";
const client = new MongoClient(uri);

router.post("/connexion", async (req, res) => {
    try {
        await client.connect();
        const db = client.db("ionos");
        const collection = db.collection("user"); // Use "user" collection

        const { mail, password } = req.body;

        // Find the user with the provided email in the "user" collection
        const user = await collection.findOne({ mail });

        // Check if the user exists and compare the hashed password
        if (user && (await bcrypt.compare(password, user.password)))
        {
            // Login successful
            res.status(200).json({ success: true, userId: user._id });
        }
        else
        {
            // Login unsuccessful
            res.status(401).json({
                success: false,
                message: "Adresse email ou mot de passe incorrect.",
            });
        }
    }
    catch (e)
    {
        console.log(e);
        res.status(500).send("Une erreur est survenue lors de la connexion.");
    }
});

module.exports = router;
