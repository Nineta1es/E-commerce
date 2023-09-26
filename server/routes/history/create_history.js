const express = require("express");
const router = express.Router();
const { MongoClient, ObjectId } = require("mongodb");

const uri = "mongodb://127.0.0.1:27042/ionos";
const client = new MongoClient(uri);

router.post("/addHistory", async (req, res) => {
    try
    {
        await client.connect();
        const db = client.db("ionos");
        const collection = db.collection("history");

        const user = db.collection("user")

        const cursor = await user.find({ _id: new ObjectId(req.body.userid) }).toArray()

        // Gestion de la date et de l'heure

        const today = new Date()

        const day = today.getDate()
        const month = today.getMonth()
        const year = today.getFullYear() 

        const hours = today.getHours()
        const minutes = today.getMinutes() 

        // Fin

        const command = {
            userId: req.body.userid,
            date: day + "/" + month + "/" + year,
            hour: hours + ":" + minutes,
            totalPrice: req.body.totalPrice,
            totalPromo: req.body.totalPromo,
            totalQuantity: req.body.quantity,
            cart: req.body.cart,
            status: "envoyé"
        }

        collection.insertOne(command)

        const backup = cursor;
        backup[0].cart = []
        await user.deleteOne({ _id: new ObjectId(req.body.userid) });
        await user.insertOne(backup[0]);

        // Gestion du stock 

        const articles = db.collection("articles");

        const shopcart = req.body.cart;

        for(const element of shopcart)
        {
            const article = await articles.findOne({_id: new ObjectId(element.article._id)});
            console.log(article)
            var stocks = article.stocks;
            stocks[element.size].stock = Number(stocks[element.size].stock) - Number(element.quantity);
            await articles.updateOne({
                _id: new ObjectId(element.article._id)
            }, {
                $set: {
                    stocks: stocks
                }
            })
        }
    }
    catch(e)
    {
        console.log(e)
    }
})

module.exports = router