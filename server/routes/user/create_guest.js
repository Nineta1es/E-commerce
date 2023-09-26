const express = require("express");
const router = express.Router();
const { MongoClient } = require("mongodb");

const uri = "mongodb://127.0.0.1:27042/ionos";
const client = new MongoClient(uri);

router.post("/createGuest", async (req, res) => {
    try
    {
        await client.connect();
        const db = client.db("ionos");
        const collection = db.collection("user");
        
        var random = Math.floor(Math.random() * 10000);

        const guest = {
            name: "guest" + random,
            mail: "guest" + random + "@guest.com",
            password: null,
            birthdate: null,
            cart: [{
                productId: req.body.productId,
                quantity: req.body.quantity,
                size: req.body.size,
                price: req.body.sizeInfo.price
            }],
            subscribe: [{
                status: false,
                startDate: null, 
                endDate: null
            }],
            creditalcard: "",
            adress: [],
            
        }

        await collection.insertOne(guest);

        const guestInfo = await collection.findOne({ mail: "guest" + random + "@guest.com" })

        res.status(200).json({info: guestInfo})
    }
    catch(e)
    {

    }
})

module.exports = router;