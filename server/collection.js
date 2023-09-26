const db = connect("mongodb://localhost:27042/ionos");
db.createCollection("articles", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: [ "name", "description", "picture", "price", "categories_id", "marque", "stock", "status", "taille", "couleur", "sexe", "reduction"],
            properties: {
                name: {
                    bsonType: "string"
                },
                description: {
                    bsonType: "string"
                },
                picture: {
                    bsonType: "binData"
                },
                price: {
                    bsonType: "decimal"
                },
                categories_id: {
                    bsonType: "objectId"
                },

                marque: {
                    bsonType: "string"
                },
                stock: {
                    bsonType: "int"
                },
                status: {
                    bsonType: "string",
                    enum: ["En stock", "En rupture de stock", "Promotion", "Limité", "Recommandé"]
                },
                taille: {
                    bsonType: "string",
                    enum: ["XS", "S", "M", "L", "XL", "XXL"]
                },
                couleur: {
                    bsonType: "string",
                    enum: ["Noir", "Blanc", "Bleu", "Rouge", "Vert", "Jaune", "Orange", "Violet", "Rose", "Gris", "Marron"]
                },
                reduction: {
                    bsonType: "float",
                    minimum: 0,
                    maximum: 1,
                },
            }
        }
    }
});

db.createCollection("users", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: [ "name", "mail", "password", "birthdate", "role", "panier", "historique"],
            properties: {
                name: {
                    bsonType: "string"
                },
                mail: {
                    bsonType: "string",
                    pattern: "^[\\w.-]+@[\\w-]+(\\.[\\w-]{2,4})+$"
                },
                password: {
                    bsonType: "binData"
                },
                birthdate: {
                    bsonType: "string"
                },
                admin: {
                    bsonType: "bool"
                },
                cart: {
                    bsonType: "array"
                },
                historique: {
                    bsonType: "array"
                },
                cardNumber: {
                    bsonType: "string"
                },
                adress: {
                    bsonType: "string"
                },

            }
        }
    }
});
db.createCollection("categories", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: [ "name"],
            properties: {
                name: {
                    bsonType: "string"
                },
            }
        }
    }
});