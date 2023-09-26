const express = require("express");
const router = express.Router();
const { MongoClient, ObjectId } = require("mongodb");

const uri = "mongodb://127.0.0.1:27042/ionos";
const client = new MongoClient(uri);

router.post("/shopping/remove", async (req, res) => {
    try 
    {
        await client.connect();
        const db = client.db("ionos");
        const collection = db.collection("user");

        const cursor = await collection
            .find({
                _id: new ObjectId(req.body.userid),
            }).toArray();
    
        var shopcart = cursor[0].cart;

        var index = 0;
        shopcart.forEach((element) => {
            if (element.productId === req.body.productid) 
            {
                shopcart.splice(index, 1);
            }
            index++;
        });
  
        await collection.updateOne(
            { _id: new ObjectId(req.body.userid) },
            {
                $set: {
                    cart: shopcart,
                },
            }
        );

        res.status(200).json({ success: "Supprimé du panier" });
    } 
    catch (e) 
    {
      console.log(e);
    }
});

module.exports = router