import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CustomLoader } from "../common/CustomLoader";
// import "../../assets/screencard.css";
import "../../assets/viewscreen.css"
import { Bounce, toast, ToastContainer } from "react-toastify";

export const ViewMyScreen = () => {
  const [screen, setScreen] = useState([]);
  const [isLoader, setisLoader] = useState(false);

  const [ratings, setRatings] = useState([]);

  const getAllRatings = async () => {
    try {
      const res = await axios.get("/rating/getall");
      setRatings(res.data.data);
    } catch (error) {
      console.error("Error fetching ratings:", error);
    }
  };

  const getAllMyScreen = async () => {
    console.log(localStorage.getItem("id"));

    setisLoader(true);
    const res = await axios.get(
      "/location/getalllocationby/" + localStorage.getItem("id")
      // "/location/getall"
    );
    console.log(res.data);
    setScreen(res.data.data);
    setisLoader(false);
  };

  useEffect(() => {
    getAllMyScreen();
    getAllRatings();
  }, []);

  const getAverageRating = (restaurantName) => {
    const restaurantRatings = ratings.filter(
      (rating) => rating.restaurantName === restaurantName
    );
    if (restaurantRatings.length === 0) return 0;

    const total = restaurantRatings.reduce((sum, r) => sum + r.rating, 0);
    return (total / restaurantRatings.length).toFixed(1);
  };

  const renderStars = (rating) => {
    const stars = [];

    for (let i = 0; i < 5; i++) {
      const fill = Math.max(0, Math.min(1, rating - i)) * 100;

      stars.push(
        <div key={i} className="star-wrapper">
          <span className="star empty">★</span>
          <span className="star full" style={{ width: `${fill}%` }}>
            ★
          </span>
        </div>
      );
    }

    return <div className="star-rating">{stars}</div>;
  };

  const deleteLocation = async (id) => {
    try {
      setisLoader(true);

      const res = await axios.delete("/location/delete/" + id);
      console.log(res);
      if (res.status == 200) {
        //alert("user deleted..");
        toast.success("record deleted successfully!!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
        getAllMyScreen(); //get -->
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete record!", {
        position: "top-center",
        autoClose: 5000,
      });
    } finally {
      setisLoader(false); // Stop loader
    }
  };

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
      <h2 className="title">OUR Restaurant</h2>
      <div className="screen-grid">
        {Array.isArray(screen) && screen.length > 0 ? (
          screen.map((sc) => (
            <div className="screen-card1" key={sc._id}>
              <div className="image-container">
                <img
                  src={sc?.imageURL || "https://via.placeholder.com/200"}
                  alt="Screen"
                  className="screen-image"
                />
                <div className="rating-overlay">
                  {renderStars(Number(getAverageRating(sc.title)))}
                  <span className="rating-value">
                    ({getAverageRating(sc.title)})
                  </span>
                </div>
              </div>
              <div className="screen-details">
                <div className="info">
                  <strong>Restaurant Name:</strong>{" "}
                  {sc.title || "No Description"}
                </div>
                <div className="info">
                  <strong>Description:</strong>{" "}
                  {sc.description || "No Description"}
                </div>
                <div className="info">
                  <strong>State:</strong> {sc.stateId?.name || "No State"}
                </div>
                <div className="info">
                  <strong>City:</strong> {sc.cityId?.name || "No City"}
                </div>
                <div className="info">
                  <strong>Area:</strong> {sc.areaId?.name || "No Area"}
                </div>
                <div className="info">
                  <strong>Location:</strong> {sc.address || "N/A"}
                </div>
                <div className="info">
                  <strong>Timing:</strong> {sc.timing || "N/A"}
                </div>
                <div className="info">
                  <strong>Avg Rating:</strong>
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      marginLeft: "8px",
                    }}
                  >
                    {renderStars(Number(getAverageRating(sc.title)))}
                    <span
                      style={{
                        marginLeft: "6px",
                        marginTop:"5px",
                        color: "#444",
                        fontSize: "14px",
                      }}
                    >
                      ({getAverageRating(sc.title)})
                    </span>
                  </div>
                </div>
                <Link
                  to={`/owner/updatescreen1/${sc._id}`}
                  className="update-button"
                >
                  Update
                </Link>
                <button
                  onClick={() => {
                    deleteLocation(sc._id);
                  }}
                  className="update-button"
                >
                  DELETE
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="no-data">No screens available</p>
        )}
      </div>
    </div>
  );
};
