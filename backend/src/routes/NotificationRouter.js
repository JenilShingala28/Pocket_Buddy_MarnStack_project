const routes = require("express").Router()

const notificationController = require("../controllers/NotificationController")

routes.get("/getalln", notificationController.getAllNotification )
routes.post("/addn", notificationController.addNotification)
routes.delete("/deleten/:id", notificationController.deleteNotificationById)

module.exports = routes