const express = require("express");
const router = express.Router();
const { MongoClient, ObjectId } = require("mongodb");
const bcrypt = require("bcrypt");
const { cp } = require("fs");

const uri = "mongodb://127.0.0.1:27042/ionos";
const client = new MongoClient(uri);

router.post("/save_payment_info", async (req, res) => {
    try 
    {
        await client.connect();
        const db = client.db("ionos");
        const collection = db.collection("user");

        const user = await collection.findOne({_id: new ObjectId(req.body.userId)});

        const adress = user.adress;

        const adressPush = {
            "name": req.body.shipName,
            "adress": req.body.shipAdress,
            "zipcode": req.body.address
        };

        adress.forEach(element => {
            if(element.name != req.body.shipName)
            {
                adress.push(adressPush);
            }
        });

        if(req.body.remember == true)
        {
            var cvv = req.body.cvv;
        }
        else
        {
            var cvv = "";
        }

        await collection.updateOne(
            { _id: new ObjectId(req.body.userId) },
            {
                $set: {
                    "creditalcard": {
                        cardNumber: req.body.cardNumber,
                        expiration: req.body.expiration,
                        owner: req.body.cardOwner,
                        cvv: cvv
                    },
                    "adress": adress,
                }
            }
        );
        
        res.send("Payment info saved successfully!");
    } catch (e) {
        console.log(e);
        res.status(500).send("An error occurred while saving payment info.");
    }
});

module.exports = router;
