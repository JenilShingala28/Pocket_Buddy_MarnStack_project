import axios from "axios";
import React, { useEffect, useState } from "react";
import { CustomLoader } from "../common/CustomLoader";
import { Link } from "react-router-dom";
import "../../assets/profile.css";

export const ViewAdminPro = () => {
  const [screen, setScreen] = useState([]);
  const [isLoader, setisLoader] = useState(false);

  
  useEffect(() => {
    getMyUserProfile();
  }, []);

  const getMyUserProfile = async () => {
    console.log(localStorage.getItem("id"));

    setisLoader(true);
    const res = await axios.get("/getalluserby/" + localStorage.getItem("id"));
    console.log(res.data);

    const userData = res.data.data; // ✅ define this

      if (Array.isArray(userData) && userData.length > 0) {
        const imageURL = userData[0].imageURL;
        if (imageURL) {
          localStorage.setItem("profileImage", imageURL); // ✅ save image to localStorage
        }
      } 
      
    setScreen(res.data.data);
    setisLoader(false);
  };


  return (
    <div className="main">
      <div className="user-profile-container">
        {isLoader == true && <CustomLoader />}
        <h2 className="title">ADMIN PROFILE</h2>
        <div className="profile">
          {Array.isArray(screen) && screen.length > 0 ? (
            screen.map((sc) => (
              <div className="profile-card" key={sc._id}>
                <img
                  src={sc?.imageURL || "https://via.placeholder.com/200"}
                  alt="User"
                  className="profile-image"
                />
                <div className="profile-details">
                  <div className="info">
                    <strong>First Name:</strong>{" "}
                    {sc.firstName || "No firstName"}
                  </div>
                  <div className="info">
                    <strong>Last Name:</strong>
                    {sc.lastName || "No lastName"}
                  </div>
                  <div className="info">
                    <strong>Email:</strong> {sc.email || "N/A"}
                  </div>
                  <div className="info">
                    <strong>Contact:</strong> {sc.contact || "N/A"}
                  </div>
                  <div className="info">
                    <strong>Address:</strong> {sc.address || "N/A"}
                  </div>
                  <Link
                    to={`/updateprofile/${sc._id}`}
                    className="update-button"
                  >
                    Update
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p className="no-data">No screens available</p>
          )}
        </div>
      </div>
    </div>
  );
};
