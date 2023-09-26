const express = require("express");
const router = express.Router();
const { MongoClient, ObjectId } = require("mongodb");

const uri = "mongodb://127.0.0.1:27042/ionos";
const client = new MongoClient(uri);

router.post("/transfert", async (req, res) => {
    try
    {
        await client.connect();
        const db = client.db("ionos");
        const collection = db.collection("user");

        const user = await collection.findOne({
            _id: new ObjectId(req.body.iduser)
        })

        var shopcart = user.cart;

        shopcart.push(req.body.cart[0])
        await collection.updateOne({_id: new ObjectId(req.body.iduser)}, {$set: {cart: shopcart}})

        res.status(200).json({success: true, message: "Nous avons ajouté " + req.body.cart.length + " article(s) a votre panier."})
    }
    catch(err)
    {
        console.log(err)
    }
})

module.exports = router