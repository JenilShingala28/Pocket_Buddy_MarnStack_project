const express = require("express"); //express....
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
//express object..
const app = express();
app.use(cors());
app.use(express.json()); //to accept data as json...

const roleRoutes = require("./src/routes/RoleRouter");
app.use(roleRoutes);

const userRoutes = require("./src/routes/UserRouter");
app.use(userRoutes);

const stateRoutes = require("./src/routes/StateRouter");
app.use("/state", stateRoutes);
//http://localhost:3000/addState
//http://localhost:3000/state/addState
//http://localhost:3000/state/getallState

const cityRouters = require("./src/routes/CityRouter");
app.use("/city", cityRouters);

const areaRoutes = require("./src/routes/AreaRouter");
app.use("/area", areaRoutes);

const locationRoutes = require("./src/routes/LocationRouter");
app.use("/location", locationRoutes);

const offerRoutes = require("./src/routes/OfferRouter");
app.use("/offer", offerRoutes);

const ratingRoutes = require("./src/routes/RatingRouter");
app.use("/rating", ratingRoutes);

const notificationRoutes = require("./src/routes/NotificationRouter");
app.use("/notification", notificationRoutes);

const dashboardRoutes = require("./src/routes/DashBoardRouter"); 
app.use("/dashboard", dashboardRoutes); //

mongoose.connect(process.env.DB_URL).then(() => {
  console.log("database connected....");
});

// server creation...

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("server started on port number", PORT);
});
