const express = require("express");
const router = express.Router();
const { MongoClient, ObjectId } = require("mongodb");

const uri = "mongodb://127.0.0.1:27042/ionos";
const client = new MongoClient(uri);

router.post("/getAdresses", async (req, res) => {
    try
    {
        await client.connect();
        const db = client.db("ionos");
        const users = db.collection("user");

        const user = await users.findOne({
            _id: new ObjectId(req.body.userId)
        })

        const adresses = user.adress;
        const data = {
            name: "",
            adress: "",
            zipcode: ""
        }

        adresses.forEach(element => {
            if(element.name === req.body.shipAddress)
            {
                data.name = element.name;
                data.adress = element.adress;
                data.zipcode = element.zipcode
            }
        });

        res.status(200).json({success: true, data: data})
    }
    catch(err)
    {
        console.log(err)
    }
})

module.exports = router