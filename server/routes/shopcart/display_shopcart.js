const express = require("express");
const router = express.Router();
const { MongoClient, ObjectId } = require("mongodb");

const uri = "mongodb://127.0.0.1:27042/ionos";
const client = new MongoClient(uri);

router.post("/shopping/display", async (req, res) => {
    try 
    {
        await client.connect();
        const db = client.db("ionos");
        const user = db.collection("user");
        const articles = db.collection("articles");
    
        const cursor = await user.find({
            _id: new ObjectId(req.body.id),
        }).toArray();
    
        const shopcart = cursor[0].cart;

        var cart = [];
        var total = 0;
        var quantity_total = 0;

        for (let index = 0; index < shopcart.length; index++) 
        {
            const cursor_article = await articles.find({
                _id: new ObjectId(shopcart[index].productId),
            }).toArray();

            cart.push({ article: cursor_article[0], quantity: shopcart[index].quantity, size: shopcart[index].size});
            if(cursor_article[0].status == "Promo")
            {
                total += Number(shopcart[index].price) * Number(shopcart[index].quantity) * (1 - cursor_article[0].promo / 100);
            }
            else
            {
                total += Number(shopcart[index].price * shopcart[index].quantity);
            }

            quantity_total += Number(shopcart[index].quantity)
        }
        res.status(200).send({ cart: cart, total: total, quantity_shopcart: quantity_total });

    } 
    catch (err) 
    {
        console.log(err);
    }
});

module.exports = router