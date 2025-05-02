
import React, { useEffect, useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";
import "../../assets/screencard.css";
import axios from "axios";
import { CustomLoader } from "../common/CustomLoader";
import { useNavigate, useParams } from "react-router-dom";

export const Ratings = () => {
    const [screen, setScreen] = useState([]);
    const [isLoader, setisLoader] = useState(false); 
    //const [searchTerm, setSearchTerm] = useState("");
    const { restaurantName } = useParams(); // <-- Get restaurant name from URL
    const navigate = useNavigate();
  
    const getAllRatingMyScreen = async () => {
      setisLoader(true);
      const res = await axios.get("/rating/getall");
      setScreen(res.data.data);
      setisLoader(false);
    };
  
    useEffect(() => {
      getAllRatingMyScreen();
    }, []);
  
    const renderStars = (rating) => {
      const maxStars = 5;
      return (
        <div className="stars">
          {[...Array(maxStars)].map((_, index) =>
            index < rating ? (
              <FaStar key={index} className="filled" />
            ) : (
              <FaRegStar key={index} className="empty" />
            )
          )}
        </div>
      );
    };
  
    // Filter ratings based on searchTerm
    // const filteredRatings = screen.filter((sc) =>
    //   sc.restaurantName?.toLowerCase().includes(searchTerm.toLowerCase())
    // );

    const filteredRatings = screen.filter(
        (sc) =>
          sc.restaurantName?.toLowerCase() ===
          decodeURIComponent(restaurantName).toLowerCase()
      );
  
    return (
      
  
      <div className="screen-container">
        {isLoader && <CustomLoader />}
        <h2 className="title">Ratings for {decodeURIComponent(restaurantName)}</h2>
        <button onClick={() => navigate(-1)} className="back-btn1">
        ⬅ Back
      </button>
  
        {/* Search Bar */}
        {/* <div className="search-bar">
          <input
            type="text"
            placeholder="Search by restaurant name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div> */}
  
        {/* Ratings Grid */}
        <div className="screen-grid">
          {filteredRatings.length > 0 ? (
            filteredRatings.map((sc) => (
              <div className="screen-card" key={sc._id}>
                <div className="screen-details">
                  <div className="info">
                    <strong>Restaurant Name:</strong>{" "}
                    {sc.restaurantName || "No Description"}
                  </div>
                  <div className="info">
                    <strong>Comments:</strong> {sc.comments || "No Description"}
                  </div>
                  <div className="info">
                    <strong>Rating:</strong> {sc.rating || "No Description"}
                  </div>
                  <div className="info">{renderStars(sc.rating || 0)}</div>
                </div>
              </div>
            ))
          ) : (
            <p className="no-data">No ratings available</p>
          )}
        </div>
      </div>
    );
}
