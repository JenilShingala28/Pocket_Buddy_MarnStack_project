const routes = require("express").Router()
// const mongoose = require("mongoose")
// const { model } = require("mongoose")
const roleController = require("../controllers/RoleController")

routes.get("/roles",roleController.getAllController)
routes.post("/role",roleController.addRole)
routes.delete("/role/:id",roleController.deleteRole)
routes.get("/role/:id",roleController.getRoleId)


module.exports = routes

