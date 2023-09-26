const express = require("express");
const router = express.Router();
const { MongoClient, ObjectId } = require("mongodb");

const uri = "mongodb://127.0.0.1:27042/ionos";
const client = new MongoClient(uri);

router.delete("/deleteCategorie/:id", async (req, res) => {
  try 
  {
    await client.connect();
    const db = client.db("ionos");
    const collection = db.collection("categories");
    
    await collection.deleteOne({
      _id: new ObjectId(req.params.id),
    });

    res.status(200).json({ success: true })
  } 
  catch (e) 
  {
    console.log(e);
  }
});

module.exports = router