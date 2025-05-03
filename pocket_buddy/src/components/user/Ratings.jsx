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
    <div className="ratings-container">
      {isLoader && <CustomLoader />}

      <div className="header">
        <h2 className="page-title">
          Ratings for {decodeURIComponent(restaurantName)}
        </h2>
        <button onClick={() => navigate(-1)} className="back-btn2">
          ⬅ Back
        </button>
      </div>

      <div className="ratings-list">
        {filteredRatings.length > 0 ? (
          filteredRatings.map((sc) => (
            <div className="rating-card" key={sc._id}>
              <div className="rating-info">
                <p>
                  <strong>Restaurant:</strong>{" "}
                  {sc.restaurantName || "No Description"}
                </p>
                <p>
                  <strong>Comments:</strong> {sc.comments || "No Description"}
                </p>
                <p>
                  <strong>Rating:</strong> {sc.rating || "No Description"}
                </p>
                <div className="stars">{renderStars(sc.rating || 0)}</div>
              </div>
            </div>
          ))
        ) : (
          <p className="no-data">No ratings available</p>
        )}
      </div>
    </div>
  );
};
