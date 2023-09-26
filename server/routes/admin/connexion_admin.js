const express = require("express");
const router = express.Router();
const { MongoClient, ObjectId } = require("mongodb");

const uri = "mongodb://127.0.0.1:27042/ionos";
const client = new MongoClient(uri);

router.post("/connexion_admin", async (req, res) => {
    try {
        await client.connect();
        const db = client.db("ionos");
        const collection = db.collection("user");
    
        const { mail, password } = req.body;
    
        // Find the user with the email that matches the collection user
        const user = await collection.findOne({ mail });
    
        // Check if the user exists and the password matches
        if (user && user.password === password) {
            // Check if the user is an admin (based on the 'admin' field)
            if (user.admin) {
            // Admin login successful
            res.status(200).json({ success: true, isAdmin: true });
            } else {
            // Regular user trying to log in as admin
            res.status(403).json({
                success: false,
                message:
                "Vous n'êtes pas autorisé à vous connecter en tant qu'administrateur.",
            });
            }
        } else {
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

module.exports = router