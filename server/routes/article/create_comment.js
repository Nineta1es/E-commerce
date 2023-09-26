const express = require("express");
const router = express.Router();
const { MongoClient, ObjectId } = require("mongodb");

const uri = "mongodb://127.0.0.1:27042/ionos";
const client = new MongoClient(uri);

router.post("/comment/create", async (req, res) => {

    const today = new Date()

    const day = today.getDate()
    const month = today.getMonth()
    const year = today.getFullYear() 

    try
    {
        await client.connect();
        const db = client.db("ionos");
        
        const article = await db.collection("articles").findOne({_id: new ObjectId(req.body.productId)});

        const user = await db.collection("user").findOne({_id: new ObjectId(req.body.userId)})
        
        const comments = article.comments;


        comments.push({
            from: user.name,
            message: req.body.comment,
            date: day + "/" + month + "/" + year
        })

        await db.collection("articles").updateOne({
            _id: new ObjectId(req.body.productId)
        }, {
            $set: {
                comments: comments
            }
        })

        res.status(200).json({success: true, message: "Commentaire posté"})
    }
    catch(err)
    {
        console.log(err)
    }
});

module.exports = router;