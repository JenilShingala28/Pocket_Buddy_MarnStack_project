const routes = require("express").Router();

const offerController = require("../controllers/OfferController");

routes.get("/getall", offerController.getAllOffer);
routes.post("/addoffer", offerController.addOffer);
routes.delete("/delete/:id", offerController.deleteOfferById);

routes.get("/byperuser/:userId", offerController.getAllOfferByUserId);
routes.put("/updateofferby/:id", offerController.updateOfferById);
routes.get("/offerby/:id", offerController.getOfferById);
routes.post("/offerfile", offerController.addWithOfferFile);

routes.put("/updatewithimg/:id", offerController.updateOfferById1);
module.exports = routes;
