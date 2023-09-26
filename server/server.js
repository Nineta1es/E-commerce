const express = require("express");
const config = require("config");
const app = express();
const port = config.get("server.port");
const host = config.get("server.host");
const mode = config.get("server.mode");
var bodyParser = require("body-parser");
const session = require("express-session");
const { MongoClient, ObjectId } = require("mongodb");
const uri = "mongodb://127.0.0.1:27042/ionos";
const client = new MongoClient(uri);

app.use(bodyParser.urlencoded({ extended: false }));

const cors = require("cors");
app.use(express.json());
app.use(cors());

// Session middleware
app.use(
  session({
    secret: "clé",
    resave: false,
    saveUninitialized: false,
  })
);

async function main() {
  try {
    await client.connect();
    console.log("Connection successful.");
  } catch (e) {
    console.log(e);
    console.log("Connection failed.");
  }
}

// pour gérer le statut connecté avec middleware
const isLoggedIn = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res
      .status(401)
      .json({ success: false, message: "Vous n'êtes pas connecté." });
  }
};

// ------------------------- ARTICLE ------------------------- //

const createArticle = require("./routes/article/create_article");
app.use('/', createArticle);

const updateArticle = require('./routes/article/update_article');
app.use('/', updateArticle);

const deleteArticle = require('./routes/article/delete_article');
app.use('/', deleteArticle);

const displayArticle = require("./routes/article/display_article")
app.use("/", displayArticle);

const idArticle = require("./routes/article/id_article")
app.use("/", idArticle)

const findArticleSize = require("./routes/article/find_size_info");
app.use('/', findArticleSize);

const createComment = require("./routes/article/create_comment");
app.use("/", createComment)

// ------------------------- USER ------------------------- //

const connexionAdmin = require("./routes/admin/connexion_admin");
app.use("/", connexionAdmin);

const connexionUser = require("./routes/user/connexion_user");
app.use("/", connexionUser);

const logout = require('./routes/user/logout')
app.use('/', logout);

const userDisplay = require("./routes/user/display_user");
app.use("/", userDisplay)

const idUser = require("./routes/user/id_user");
app.use("/", idUser);

const createUser = require("./routes/user/create_user");
app.use("/", createUser);

const updateUser = require('./routes/user/update_user');
app.use("/", updateUser)

const deleteUser = require('./routes/user/delete_user');
app.use("/", deleteUser);

const paymentUser = require('./routes/user/payment_user');
app.use("/", paymentUser);

const getAdresses = require("./routes/user/get_adresses");
app.use("/", getAdresses)

// ------------------------- CATEGORIES ------------------------- //

const createCategorie = require('./routes/categorie/create_categorie');
app.use('/', createCategorie)

const displayCategorie = require("./routes/categorie/display_categorie");
app.use("/", displayCategorie);

const updateCategorie = require("./routes/categorie/update_categorie");
app.use('/', updateCategorie);

const deleteCategorie = require("./routes/categorie/delete_categorie");
app.use('/', deleteCategorie);

// ------------------------- PANIER ------------------------- //

const shoppingAdd = require("./routes/shopcart/add_shopcart");
app.use("/", shoppingAdd);

const removeShopcart = require("./routes/shopcart/remove_shopcart");
app.use('/', removeShopcart);

const removeOne = require("./routes/shopcart/remove_one_shopcart");
app.use('/', removeOne);

const displayShopcart = require("./routes/shopcart/display_shopcart");
app.use('/', displayShopcart);

// ------------------------- ABONNEMENT ------------------------- //

const addSub = require("./routes/subscription/add_sub");
app.use("/", addSub);

const removeSub = require("./routes/subscription/remove_sub")
app.use('/', removeSub);

const displaySub = require("./routes/subscription/display_sub");
app.use("/", displaySub);

// ------------------------- SHIPMENT ------------------------- //

const shipment = require("./routes/api/easypost");
app.use("/", shipment);

// ------------------------- FEATURE ------------------------- //

const addHistory = require("./routes/history/create_history");
app.use("/", addHistory)

const displayHistory = require("./routes/history/display_history");
app.use("/", displayHistory)

const createGuest = require("./routes/user/create_guest");
app.use('/', createGuest);

const promotion = require("./routes/admin/create_promotion");
app.use('/', promotion);

const displayPromotion = require("./routes/admin/display_promotion");
app.use('/', displayPromotion);

const deletePromotion = require("./routes/admin/delete_promotion");
app.use("/", deletePromotion);

const transfert = require("./routes/user/transfert_cart");
app.use('/', transfert)

const excel = require("./routes/admin/excel");
app.use('/', excel);

// ------------------------- SERVER ------------------------- //

main().catch(console.error);

const server = app.listen(port, host, (err) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  console.log(
    `Server is running on ${host}:${
      server.address().port
    } with the ${mode} mode`
  );
});