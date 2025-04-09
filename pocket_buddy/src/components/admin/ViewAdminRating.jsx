import React, { useEffect, useState } from "react";
import "../../assets/screencard.css";
import axios from "axios";
import { FaRegStar, FaStar } from "react-icons/fa";
import { Bounce, ToastContainer } from "react-toastify";
import { CustomLoader } from "../common/CustomLoader";

export const ViewAdminRating = () => {
  const [screen, setScreen] = useState([]);
  const [isLoader, setisLoader] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const getAllRatingMyScreen = async () => {
    console.log(localStorage.getItem("id"));

    setisLoader(true);
    const res = await axios.get(
      // "/rating/byperuser/" + localStorage.getItem("id")
      "/rating/getall"
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

  // Filter ratings based on searchTerm
  const filteredRatings = screen.filter((sc) =>
    sc.restaurantName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="screen-container">
      <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
      {isLoader == true && <CustomLoader />}
      <h2 className="title">VIEW ALL RATING</h2>

      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by restaurant name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

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
              {/* <Link
                to={`/admin/updaterating/${sc._id}`}
                className="update-button"
              >
                Update
              </Link>
              <button
                onClick={() => {
                  deleteOffer(sc._id);
                }}
                className="update-button"
              >
                DELETE
              </button> */}
            </div>
          ))
        ) : (
          <p className="no-data">No ratings available</p>
        )}
      </div>      
    </div>
  );
};
