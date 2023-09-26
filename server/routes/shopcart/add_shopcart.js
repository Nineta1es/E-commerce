const express = require("express");
const router = express.Router();
const { MongoClient, ObjectId } = require("mongodb");

const uri = "mongodb://127.0.0.1:27042/ionos";
const client = new MongoClient(uri);

router.post("/shopping/add", async (req, res) => {
    try 
    {
        await client.connect();
        const db = client.db("ionos");
        const collection = db.collection("user");
        const articles = db.collection("articles");
    
        const cursor = await collection.find({
            _id: new ObjectId(req.body.id),
        }).toArray();
    
        var shopcart = cursor[0].cart;
        
        let do_product_exist = 0;

        shopcart.forEach((element) => {
            if (element.productId === req.body.productId && element.size === req.body.size) 
            {
                do_product_exist++;
            }
        });
    
        if (do_product_exist === 0) 
        {
            shopcart.push({
                productId: req.body.productId,
                quantity: req.body.quantity,
                size: req.body.size,
                price: req.body.sizeInfo.price
            });

            await collection.updateOne(
                { _id: new ObjectId(req.body.id) },
                {
                    $set: {
                        cart: shopcart,
                    },
                }
            );
        } 
        else 
        {
            const product = await articles.findOne({
                _id: new ObjectId(req.body.productId),
            });
    
            shopcart.forEach((element) => {
                if (element.productId === req.body.productId) 
                {
                    if (Number(element.quantity) + Number(req.body.quantity) >= Number(product.stocks[req.body.size].quantity)) 
                    {
                        element.quantity = Number(product.stocks[req.body.size].quantity);
                    } 
                    else 
                    {
                        element.quantity = Number(element.quantity) + Number(req.body.quantity);
                    }
                }
            });
  
            const backup = cursor;
    
            await collection.deleteOne({ _id: new ObjectId(req.body.id) });
    
            await collection.insertOne(backup[0]);
        }
  
        res.status(200).json({success: "Ajouté au panier"});
    } 
    catch (e) 
    {
        console.log(e);
    }
});

module.exports = router