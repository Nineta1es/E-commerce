const express = require("express");
const router = express.Router();
const { MongoClient, ObjectId } = require("mongodb");

const uri = "mongodb://127.0.0.1:27042/ionos";
const client = new MongoClient(uri);

router.post("/shopping/removeOne", async (req, res) => {
    try {
      await client.connect();
      const db = client.db("ionos");
      const collection = db.collection("user");
  
      const cursor = await collection
        .find({
          _id: new ObjectId(req.body.userid),
        })
        .toArray();
  
      var shopcart = cursor[0].cart;
  
      for (let i = 0; i < shopcart.length; i++) {
        if (shopcart[i].productId === req.body.productid) {
          if (shopcart[i].quantity > 1) {
            shopcart[i].quantity--;
          } else {
            shopcart.splice(i, 1); 
          }
          break; 
        }
      }
  
      await collection.updateOne(
        { _id: new ObjectId(req.body.userid) },
        {
          $set: {
            cart: shopcart,
          },
        }
      );
  
      const updatedCursor = await collection
        .find({
          _id: new ObjectId(req.body.userid),
        })
        .toArray();
  
      const updatedCart = updatedCursor[0].cart;
      const updatedTotal = calculateTotal(updatedCart);
  
      res.status(200).json({ cart: updatedCart, total: updatedTotal });
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  
  module.exports = router