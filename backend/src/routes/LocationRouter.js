const routes = require("express").Router();
const locationController = require("../controllers/LocationController");

routes.post("/addlocation", locationController.addLocation);
routes.get("/getall", locationController.getAllLocation);
routes.delete("/delete/:id", locationController.deleteLocationById);

routes.get("/getperlocby/:id", locationController.getLocationById);

routes.post("/addfile", locationController.addWithFile);

routes.get(
  "/getalllocationby/:userId",
  locationController.getAllLocationByUserId
);



routes.put("/updateby/:id", locationController.updatedLocationById);

module.exports = routes;
