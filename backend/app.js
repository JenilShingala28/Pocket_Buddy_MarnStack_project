const express = require("express"); //express....
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
//express object..
const app = express();
app.use(
  cors({
    origin: [
      "http://localhost:5173", // local dev
      "https://pocket-buddy-frontend.vercel.app", // your vercel frontend
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
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

// mongoose.connect(process.env.DB_URL).then(() => {
//   console.log("database connected....");
// });

const dbURL =
  process.env.NODE_ENV === "production"
    ? process.env.PROD_DB_URL // MongoDB Atlas
    : process.env.DB_URL; // Local MongoDB / Compass

mongoose
  .connect(dbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connected..."))
  .catch((err) => console.error("DB Connection Error:", err));

// server creation...

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("server started on port number", PORT);
});
