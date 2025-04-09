const routes = require("express").Router();
const cityController = require("../controllers/CityController")

routes.post("/addcity",cityController.addCity)
routes.get("/getallcity",cityController.getAllCity)
routes.get("/getallcitybystate/:stateId",cityController.getCityByStateId)

module.exports = routes