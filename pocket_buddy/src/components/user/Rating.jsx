import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { CustomLoader } from '../common/CustomLoader';
import { FaRegStar, FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import "../../assets/screencard.css";

export const Rating = () => {
      const [screen, setScreen] = useState([]); 
      const [isLoader, setisLoader] = useState(false);
    
      const getAllRatingMyScreen = async () => {
        console.log(localStorage.getItem("id"));
    
        setisLoader(true);
        const res = await axios.get(
          "/rating/byperuser/" + localStorage.getItem("id")
        );
        console.log(res.data);
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
  return (
    <div className="screen-container1">
    {isLoader == true && <CustomLoader />}
    <h2 className="title">OUR RATING</h2>
    <div className="screen-grid1">
      {Array.isArray(screen) && screen.length > 0 ? (
        screen.map((sc) => (
          <div className="screen-card2" key={sc._id}>
            {/* <img
                  src={sc?.imageURL || "https://via.placeholder.com/200"}
                  alt="Screen"
                  className="screen-image"
                /> */}
            <div className="screen-details1">
            <div className="info">
                  <strong>Restaurant Name:</strong> {sc.restaurantName || "No Description"}
                </div>
              <div className="info">
                <strong>Comments:</strong> {sc.comments || "No Description"}
              </div>
              <div className="info">
                <strong>Rating:</strong> {sc.rating || "No Description"}
              </div>
              <div className="info">{renderStars(sc.rating || 0)}</div>
              <Link
                to={`/user/updaterating/${sc._id}`}
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
  )
}
