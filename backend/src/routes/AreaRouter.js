const routes = require("express").Router();

const areaController = require("../controllers/AreaController");

routes.post("/addarea", areaController.addArea);
routes.get("/getallarea", areaController.getAllArea);
routes.get("/getallareabycity/:cityId", areaController.getAllAreaByCityId);

module.exports = routes;
