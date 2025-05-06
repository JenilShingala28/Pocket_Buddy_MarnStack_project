const routes = require("express").Router();
const locationController = require("../controllers/LocationController");

routes.post("/addlocation", locationController.addLocation);
routes.get("/getall", locationController.getAllLocation);
routes.delete("/delete/:id", locationController.deleteLocationById);

routes.get("/getperlocby/:id", locationController.getLocationById);

routes.post("/addfile", locationController.addWithFile);
routes.post("/addfile1", locationController.addWithMultipleFiles);
routes.get(
  "/getalllocationby/:userId",
  locationController.getAllLocationByUserId
);



routes.put("/updateby/:id", locationController.updatedLocationById);
routes.put("/updateby1/:id", locationController.updateLocationById1);
routes.put("/updateby2/:id", locationController.updateLocationById2);
module.exports = routes;
