const routes = require("express").Router();

const userController = require("../controllers/UserController");
const UserModel = require("../models/UserModel");

 const authMiddleware = require("../middleware/AuthMiddleware")

routes.get("/users", authMiddleware.authMiddleware,userController.getUser);
routes.post("/ulogin", userController.loginUserWithToken);

//routes.get("/users", userController.getUser);
routes.delete("/delete/:id", userController.deleteUserById);
routes.post("/user", userController.postUser1);
routes.post("/signup", userController.signup);
routes.post("/osignup", userController.osignup);


//routes.post("/ulogin", userController.ulogin);



routes.post("/ologin", userController.ologin);
routes.delete("/user/:id", userController.deleteUser);

routes.get("/userby/:id", userController.getUserById);
routes.put("/updateuprofileby/:id", userController.updateUserProfileById);
routes.put("/updateoprofileby/:id", userController.updateOwnerProfileById);
routes.put("/updateaprofileby/:id", userController.updateAdminProfileById);
routes.post("/userfile", userController.addWithUserFile);
routes.get("/getalluserby/:userId", userController.getAllUserByUserId);

routes.post("/forgetpassword", userController.forgetPassword);
routes.post("/resetpassword", userController.resetpassword);

module.exports = routes;
