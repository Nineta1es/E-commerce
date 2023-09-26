const express = require("express");
const router = express.Router();
const { MongoClient, ObjectId } = require("mongodb");
const bcrypt = require("bcrypt");

const uri = "mongodb://127.0.0.1:27042/ionos";
const client = new MongoClient(uri);

router.post("/createUser", async (req, res) => {
    try {
        await client.connect();
        const db = client.db("ionos");
        const collection = db.collection("user");
        
        // Hash the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

        const user = {
            name: req.body.name,
            mail: req.body.mail,
            password: hashedPassword, // Utiliser le mot de passe haché
            birthdate: req.body.birthdate,
            admin: req.body.isAdmin || false,
            cart: [],
            subscribe: [{
                status: false, startDate: null, endDate: null
            }],
            creditalcard: {
                cardnumber: "",
                expiration: "",
                owner: "",
                cvv: ""
            },
            adress: [],
        }; 
        collection.insertOne(user);
        res.json({ message: "User created successfully!" });
    } 
    catch (e) 
    {
        console.log(e);
        res.status(500).send("An error occurred while creating the user.");
    }
});

module.exports = router