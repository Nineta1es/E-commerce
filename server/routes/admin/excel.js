const express = require("express");
const router = express.Router();
const { MongoClient, ObjectId } = require("mongodb");
const excel = require("exceljs");
const c = require("config");

const uri = "mongodb://127.0.0.1:27042/ionos";
const client = new MongoClient(uri);

router.get("/excel", async (req, res) => {
    await client.connect();
    const db = client.db("ionos");
    const clients = db.collection("user");
    const allClients = await clients.find({}).toArray();

    const history = db.collection("history");
    const allHistory = await history.find({}).toArray();

    const articles = db.collection("articles");
    const allArticles = await articles.find({}).toArray();

    const workbook = new excel.Workbook();
    const worksheet = workbook.addWorksheet("Clients");
    const worksheet2 = workbook.addWorksheet("Historique des commandes");
    const worksheet3 = workbook.addWorksheet("Articles");

    worksheet.columns = [
        { header: "_id", key: "_id", width: 30 },
        { header: "Nom", key: "name", width: 30 },
        { header: "Mail", key: "mail", width: 30 },
        { header: "Date de naissance", key: "birthdate", width: 30 },
        { header: "Adresse", key: "adress", width: 30 },
        { header: "Code postal", key: "postalAddress", width: 30 },
        { header: "Statut d'Abonnement", key: "subscribe", width: 30 },
        { header: "Début d'abonnement", key: "startDate", width: 30},
        { header: "Fin d'abonnement", key: "endDate", width: 30},
    ];

    allClients.forEach((client) => {
        if(client.name == null || client.name == ""){
            client.name = "Non renseigné";
        }
        if(client.mail == null || client.mail == ""){
            client.mail = "Non renseigné";
        }
        if(client.birthdate == null || client.birthdate == ""){
            client.birthdate = "Non renseigné";
        }
        if(client.adress == null || client.adress == ""){
            client.adress = "Non renseigné";
        }
        if(client.postalAddress == null || client.postalAddress == ""){
            client.postalAddress = "Non renseigné";
        }
        if(client.subscribe == null || client.subscribe == ""){
            client.subscribe = "Non renseigné";
        }
        if(client.subscribe[0].startDate == null || client.subscribe[0].startDate == ""){
            client.subscribe[0].startDate = "Non renseigné";
        }
        if(client.subscribe[0].endDate == null || client.subscribe[0].endDate == ""){
            client.subscribe[0].endDate = "Non renseigné";
        }
        if (client.subscribe[0].status === true) {
            client.subscribe[0].status = "Abonné";
        }
        else {
            client.subscribe[0].status = "Non abonné";
        }
        worksheet.addRow({
            _id: client._id,
            name: client.name,
            mail: client.mail,
            birthdate: client.birthdate,
            adress: client.adress,
            postalAddress: client.postalAddress,
            subscribe: client.subscribe[0].status,
            startDate: client.subscribe[0].startDate,
            endDate: client.subscribe[0].endDate,
        });
    });

    worksheet2.columns = [
        { header: "Utilisateur", key: "userId", width: 30 },
        { header: "Date de commande", key: "date", width: 30 },
        { header: "heure de commande", key: "hour", width: 30 },
        { header: "Prix total", key: "totalPrice", width: 30 },
        { header: "Quantité total", key: "totalQuantity", width: 30 },
        { header: "Produits", key: "cart", width: 30}
    ];

    allHistory.forEach((history) => {
        username = "";
        allClients.forEach((client) => {
            if(history.userId == client._id){
                username = client.name;
            }
        });

        cartid = [];
        history.cart.forEach((cart) => {
            cartid.push(cart.article.name + " (" + cart.size + ")" + " x" + cart.quantity + "");
        });

        if(history.date == null || history.date == ""){
            history.date = "Non renseigné";
        }
        if(history.hour == null || history.hour == ""){
            history.hour = "Non renseigné";
        }
        if(history.totalPrice == null || history.totalPrice == ""){
            history.totalPrice = "Non renseigné";
        }
        if(history.totalQuantity == null || history.totalQuantity == ""){
            history.totalQuantity = "Non renseigné";
        }

        worksheet2.addRow({
            userId: username,
            date: history.date,
            hour: history.hour,
            totalPrice: history.totalPrice,
            totalQuantity: history.totalQuantity,
            cart: cartid,

        });
    });

    worksheet3.columns = [
        { header: "_id", key: "_id", width: 30 },
        { header: "Nom", key: "name", width: 30 },
        { header: "Description", key: "description", width: 30 },
        { header: "Catégorie", key: "category", width: 30 },
        { header: "Marque", key: "marque", width: 30 },
        { header: "XS", key: "XS", width: 30 },
        { header: "S", key: "S", width: 30 },
        { header: "M", key: "M", width: 30 },
        { header: "L", key: "L", width: 30 },
        { header: "XL", key: "XL", width: 30 },
        { header : "Status", key: "status", width: 30},
        { header : "Promotion", key: "promo", width: 30}
    ];

    allArticles.forEach((article) => {
        XS = "STOCK : " + article.stocks.xs.stock + " / PRIX : " + article.stocks.xs.price + "€";
        S = "STOCK : " + article.stocks.s.stock + " / PRIX : " + article.stocks.s.price + "€";
        M = "STOCK : " + article.stocks.m.stock + " / PRIX : " + article.stocks.m.price + "€";
        L = "STOCK : " + article.stocks.l.stock + " / PRIX : " + article.stocks.l.price + "€";
        XL = "STOCK : " + article.stocks.xl.stock + " / PRIX : " + article.stocks.xl.price + "€";

        if(article.status == null || article.status == ""){
            article.status = "Non renseigné";
        }
        if(article.promo == null || article.promo == "" || article.status !== "Promo"){
            article.promo = "Aucune promotion";
        } 
        if(article.name == null || article.name == ""){
            article.name = "Non renseigné";
        }
        if(article.description == null || article.description == ""){
            article.description = "Non renseigné";
        }
        if(article.price == null || article.price == ""){
            article.price = "Non renseigné";
        }
        if(article.category == null || article.category == ""){
            article.category = "Non renseigné";
        }
        if(article.brand == null || article.brand == ""){
            article.brand = "Non renseigné";
        }
        worksheet3.addRow({
            _id: article._id,
            name: article.name,
            description: article.description,
            category: article.categorie,
            marque: article.brand,
            status: article.status,
            XS: XS,
            S: S,
            M: M,
            L: L,
            XL: XL,
            promo: article.promo,
        });
    });

    await workbook.xlsx.writeFile("data.xlsx");
    res.download("data.xlsx");

    await client.close();


});

module.exports = router;