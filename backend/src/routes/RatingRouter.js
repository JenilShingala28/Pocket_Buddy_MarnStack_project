const routes = require("express").Router();
const ratingController = require("../controllers/RatingController");

routes.get("/getall", ratingController.getAllRating);
routes.post("/add", ratingController.addRating);
routes.delete("/delete/:id", ratingController.deleteRatingById);

routes.get("/byperuser/:userId", ratingController.getAllRatingByUserId);
routes.put("/updateratingby/:id", ratingController.updateRatingById);
routes.get("/ratingby/:id", ratingController.getRatingById);

module.exports = routes;
