const express = require("express");
const router = express.Router();
const { MongoClient, ObjectId } = require("mongodb");
const bcrypt = require("bcrypt");

const uri = "mongodb://127.0.0.1:27042/ionos";
const client = new MongoClient(uri);

router.put("/updateUser/:id", async (req, res) => {
    try {
        const db = client.db("ionos");
        const collection = db.collection("user");
        const { name, mail, password, birthdate, admin } = req.body;

    
        // Find the user with the specified ID
        const user = await collection.findOne({ _id: new ObjectId(req.params.id) });
    
        if (!user) 
        {
            return res.status(404).json({ success: false, message: "Utilisateur non trouvé." });
        }
    
        let hashedPassword;
        if (password) 
        {
            const saltRounds = 10;
            hashedPassword = await bcrypt.hash(password, saltRounds);
        }
    
        const updateData = {
            name: name || user.name,
            mail: mail || user.mail,
            password: hashedPassword || user.password,
            birthdate: birthdate || user.birthdate,
            admin: user.admin,
            cart: user.cart,
            creditalcard: req.body.cardInfo || user.creditalcard,
            adress: req.body.adress || user.adress,
        };
    
        await collection.updateOne({ _id: new ObjectId(req.params.id) },
            { 
                $set: updateData 
            }
        );
        res.status(200).json({ success: true, message: "Utilisateur mis à jour avec succès." });
    } 
    catch (e) 
    {
        console.log(e);
    }
});

module.exports = router