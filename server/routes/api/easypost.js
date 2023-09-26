const express = require("express");
const router = express.Router()
const EasyPostClient = require('@easypost/api');

const easypost_client = new EasyPostClient("EZAKb5443f57ffb64024aa420638d52306292gO3uxKw8vX0JWhJWDy9Gg");

router.post("/shipment", async (req, res) => {

    var quantity = (req.body.quantity * 14) + 1;

    const shipment = await easypost_client.Shipment.create({
        from_address: {
            street1: '417 MONTGOMERY ST',
            street2: 'FLOOR 5',
            city: 'SAN FRANCISCO',
            state: 'CA',
            zip: '94104',
            country: 'US',
            company: 'EasyPost',
            phone: '415-123-4567',
        },
        to_address: {
            name: 'Dr. Steve Brule',
            street1: '179 N Harbor Dr',
            city: 'Redondo Beach',
            state: 'CA',
            zip: '90277',
            country: 'US',
            phone: '4155559999',
        },
        parcel: {
            length: 8,
            width: 5,
            height: 5,
            weight: quantity,
        },
    });

    for (let index = 0; index < shipment.rates.length; index++) {
        if(shipment.rates[index].service === req.body.method)
        {
            res.status(200).json({ shipment: shipment.rates[index] })
        }
    }      
})

module.exports = router;