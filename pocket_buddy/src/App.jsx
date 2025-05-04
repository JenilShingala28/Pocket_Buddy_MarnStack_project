import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { UserSidebar } from "./components/layouts/UserSidebar";
//import './App.css'
//import App from './App.jsx'
import "./assets/adminlte.css";
import "./assets/adminlte.min.css";
import { Route, Routes, useLocation } from "react-router-dom";
import { Login } from "./components/common/Login";
import { UserProfile } from "./components/user/UserProfile";
import { AddOffer } from "./components/restaurants/AddOffer";
import { AdminProfile } from "./components/admin/AdminProfile";
import { UserSignup } from "./components/common/UserSignup";
import axios from "axios";
import { OwnerSignup } from "./components/common/OwnerSignup";
import { OwnerLogin } from "./components/common/OwnerLogin";
import { AddLocation } from "./components/restaurants/AddLocation";
import { UserNavbar } from "./components/layouts/UserNavbar";
import PrivateRouter from "./hooks/PrivateRouter";
import LandingPage from "./components/common/LandingPage";
import { AddLocation2 } from "./components/restaurants/AddLocation2";
import { ViewMyScreen } from "./components/restaurants/ViewMyScreen";
import { UpdateMyScreen } from "./components/restaurants/UpdateMyScreen";
import { RestaurentList } from "./components/admin/RestaurentList";
import { AddRating } from "./components/restaurants/AddRating";
import { ViewOffer } from "./components/restaurants/ViewOffer";
import { ViewRating } from "./components/restaurants/ViewRating";
import { ViewProfile } from "./components/user/ViewProfile";
import { UpdateMyProfile } from "./components/user/UpdateMyProfile";
import { UpdateOffer } from "./components/restaurants/UpdateOffer";
import { UpdateRating } from "./components/restaurants/UpdateRating";
import { ResetPassword } from "./components/common/ResetPassword";
import { ForgetPassword } from "./components/common/ForgetPassword";
import { Home } from "./components/common/Home";
import { AdminSidebar } from "./components/layouts/AdminSidebar";
import { ViewAdminPro } from "./components/admin/ViewAdminPro";
import { UpdateAdPro } from "./components/admin/updateAdPro";
import { Offer } from "./components/user/Offer";
import { Restaurants } from "./components/user/Restaurants";
import { Rating } from "./components/user/Rating";
import { UpdateRatingU } from "./components/user/UpdateRatingU";
import { AddRatingU } from "./components/user/AddRatingU";
import { ViewAllRating } from "./components/user/ViewAllRating";
import { OwnerSidebar } from "./components/layouts/OwnerSidebar";
import { ViewRestaurent } from "./components/admin/ViewRestaurent";
import { ViewAdminRating } from "./components/admin/ViewAdminRating";
import { ViewAdminOffer } from "./components/admin/ViewAdminOffer";
import { Oprofile } from "./components/restaurants/Oprofile";
import { UpdateOprofile } from "./components/restaurants/UpdateOprofile";
import { ViewOprofile } from "./components/restaurants/ViewOprofile";
import { DashBord } from "./components/admin/DashBord";
import { OfferList } from "./components/admin/OfferList";
import { RatingList } from "./components/admin/RatingList";
import { UserList } from "./components/admin/UserList";
import { ContectUs } from "./components/common/ContectUs";
import { Offers } from "./components/user/Offers";
import { Ratings } from "./components/user/Ratings";
import { RatingPerU } from "./components/restaurants/RatingPerU";
import { ViewAOffer } from "./components/admin/ViewAOffer";

function App() {
  axios.defaults.baseURL = "http://localhost:3000";

  const location = useLocation();

  useEffect(() => {
    // || location.pathname === "/osignup"
    if (
      location.pathname === "/login" ||
      location.pathname === "/" ||
      location.pathname === "/contact" ||
      location.pathname === "/userprofile" ||
      location.pathname === "/myprofile" ||
      location.pathname === "/aprofile" ||
      location.pathname === "/adprofile" ||
      location.pathname === "/oprofile" ||
      location.pathname === "/viewoprofile" ||
      location.pathname === "/addoffer" ||
      location.pathname === "/ologin" ||
      location.pathname === "/signup" ||
      location.pathname === "/forgetpassword" ||
      location.pathname === "/resetpassword/:token" ||
      location.pathname === "/osignup" 
      
    ) {
      document.body.className = ""; // Remove the unwanted class for login and signup
    } else {
      document.body.className =
        "layout-fixed sidebar-expand-lg bg-body-tertiary sidebar-open app-loaded";
    }
  }, [location.pathname]);

  return (
    <div
      className={
        location.pathname === "/login" ||
        location.pathname === "/" ||
        location.pathname === "/contact" ||
        location.pathname === "/userprofile" ||
        location.pathname === "/myprofile" ||
        location.pathname === "/aprofile" ||
        location.pathname === "/adprofile" ||
        location.pathname === "/oprofile" ||
        location.pathname === "/viewoprofile" ||
        location.pathname === "/addoffer" ||
        location.pathname === "/ologin" ||
        location.pathname === "/signup" ||
        location.pathname === "/forgetpassword" ||
        location.pathname === "/resetpassword/:token" ||
        location.pathname === "/osignup" 
        

          ? ""
          : "app-wrapper"
      }
    >
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<UserSignup />}></Route>
        <Route path="/" element={<LandingPage />}></Route>
        {/* <Route path="/contact" element={<ContectUs />}></Route> */}

        <Route path="/resetpassword/:token" element={<ResetPassword />}></Route>
        <Route path="/forgetpassword" element={<ForgetPassword />}></Route>
        {/* <Route path="/ologin" element={<OwnerLogin/>}></Route> 
          <Route path="/osignup" element={<OwnerSignup/>}></Route> */}

        <Route path="/aprofile" element={<AdminProfile />}></Route>
        <Route path="/adprofile" element={<ViewAdminPro />}></Route>
        <Route path="/updateaprofile/:id" element={<UpdateAdPro />}></Route>

        <Route path="/oprofile" element={<Oprofile />}></Route>
        <Route path="/viewoprofile" element={<ViewOprofile />}></Route>
        <Route path="/updateoprofile/:id" element={<UpdateOprofile />}></Route>

        <Route path="/userprofile" element={<UserProfile />}></Route>
        <Route path="/myprofile" element={<ViewProfile />}></Route>
        <Route path="/updateuprofile/:id" element={<UpdateMyProfile />}></Route>

        {/* <Route path="/restolist" element={<RestaurentList />}></Route> */}

        <Route path="/home" element={<Home />}></Route>

        <Route path="" element={<PrivateRouter />}>
          <Route path="/user" element={<UserSidebar />}>
            <Route path="" element={<Home />}></Route>

            <Route path="myresto" element={<Restaurants />}></Route>

            <Route path="myoffer" element={<Offer />}></Route>
            <Route path="offers/:restaurantName" element={<Offers />} />

            <Route path="ratings/:restaurantName" element={<Ratings />} />

            <Route path="addrating" element={<AddRatingU />}></Route>
            <Route path="myrating" element={<Rating />}></Route>
            <Route path="updaterating/:id" element={<UpdateRatingU />}></Route>

            <Route path="allrating" element={<ViewAllRating />}></Route>

            <Route path="contact" element={<ContectUs />}></Route>

          </Route>

          <Route path="/admin" element={<AdminSidebar />}>
            <Route path="" element={<DashBord />}></Route>

            
            <Route path="myresto" element={<ViewRestaurent />}></Route>          
            
            <Route path="myoffer" element={<ViewAdminOffer />}></Route>
          
            <Route path="allrating" element={<ViewAdminRating />}></Route>

            <Route path="ratings/:restaurantName" element={<ViewRating />} />

            <Route path="restolist" element={<RestaurentList />}></Route>
            <Route path="offerlist" element={<OfferList />}></Route>
            <Route path="ratinglist" element={<RatingList />}></Route>
            <Route path="alluser" element={<UserList />}></Route>

            <Route path="dashboard" element={<DashBord />}></Route>

            <Route path="contact" element={<ContectUs />}></Route>
          </Route>

          <Route path="/owner" element={<OwnerSidebar />}>
            <Route path="" element={<Home />}></Route>

            <Route path="addlocation2" element={<AddLocation2 />}></Route>
            <Route path="myresto" element={<ViewMyScreen />}></Route>
            <Route
              path="updatescreen1/:id"
              element={<UpdateMyScreen />}
            ></Route>

            <Route path="addoffer" element={<AddOffer />}></Route>
            <Route path="myoffer" element={<ViewOffer />}></Route>
            <Route path="updateoffer/:id" element={<UpdateOffer />}></Route>

            {/* <Route path="addrating" element={<AddRating />}></Route>  */}
            <Route path="myrating" element={<ViewRating />}></Route>
            {/* <Route path="updaterating/:id" element={<UpdateRating />}></Route> */}

            <Route path="ratings/:restaurantName" element={<RatingPerU />} />
            <Route path="offers/:restaurantName" element={<ViewAOffer />} />

            <Route path="contact" element={<ContectUs />}></Route>
          </Route>

          {/* <Route path="/moderator" element={<OwnerSidebar />}>
            <Route path="" element={<Home />}></Route>

            

             <Route path="addrating" element={<AddRating />}></Route>  
            <Route path="myrating" element={<ViewRating />}></Route>
             <Route path="updaterating/:id" element={<UpdateRating />}></Route> 

          </Route> */}
        </Route>
      </Routes>
    </div>
  );
}

export default App;
