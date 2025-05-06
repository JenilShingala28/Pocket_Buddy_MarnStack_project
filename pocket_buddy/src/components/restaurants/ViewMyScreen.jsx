import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CustomLoader } from "../common/CustomLoader";
 import "../../assets/screencard.css";
//import "../../assets/viewscreen.css"
import "../../assets/screencardperticuler.css";
import { Bounce, toast, ToastContainer } from "react-toastify";
 
export const ViewMyScreen = () => {
  const [screen, setScreen] = useState([]);
  const [filteredScreens, setFilteredScreens] = useState([]);
  const [isLoader, setIsLoader] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");

  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]); 
  const [areas, setAreas] = useState([]);

  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedArea, setSelectedArea] = useState("");

  const [ratings, setRatings] = useState([]);

  const getAllRatings = async () => {
    try {
      const res = await axios.get("/rating/getall");
      setRatings(res.data.data);
    } catch (error) {
      console.error("Error fetching ratings:", error);
    }
  };

  // const getAllMyScreen = async () => {
  //   console.log(localStorage.getItem("id"));

  //   setisLoader(true);
  //   const res = await axios.get(
  //     "/location/getalllocationby/" + localStorage.getItem("id")
  //     // "/location/getall"
  //   );
  //   console.log(res.data);
  //   setScreen(res.data.data);
  //   setisLoader(false);
  // };
  const getAllMyScreen = async () => {
    setIsLoader(true);
    try {
      const res = await axios.get("/location/getalllocationby/" + localStorage.getItem("id"));
      setScreen(res.data.data);
      setFilteredScreens(res.data.data);
    } catch (error) {
      console.error("Error fetching locations:", error);
    }
    setIsLoader(false);
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
  const applyFilters = () => {
    let filtered = [...screen];
  
    if (searchTerm.trim()) {
      filtered = filtered.filter((sc) =>
        sc.title?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  
    setFilteredScreens(filtered);
  };
  
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    applyFilters();
  }, [screen, searchTerm]);
  

  const navigate = useNavigate();

  const handleCardClick = (restaurantName) => {
    navigate(`/owner/offers/${encodeURIComponent(restaurantName)}`);
  };

  const deleteLocation = async (id) => {
    try {
      setIsLoader(true);

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
      setIsLoader(false); // Stop loader
    }
  };

  const ImageCarousel = ({ sc, getAverageRating, renderStars }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const images = Array.isArray(sc?.imageURL) ? sc.imageURL : [];

    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
      }, 3000);
      return () => clearInterval(interval);
    }, [images.length]);

    const handleThumbnailClick = (index) => {
      setCurrentIndex(index);
    };

    return (
      <div className="carousel-container">
        <div className="main-image-wrapper">
          <div className="rating-overlay">
            {renderStars(Number(getAverageRating(sc.title)))}
            <span className="rating-value">
              ({getAverageRating(sc.title)})
            </span>
          </div>
          {images.length > 0 ? (
            <img
              src={images[currentIndex]}
              alt={`Image ${currentIndex}`}
              className="main-image"
            />
          ) : (
            <img
              src="https://via.placeholder.com/200"
              alt="No Image"
              className="main-image"
            />
          )}
        </div>
        <div className="thumbnail-wrapper">
          {images.map((url, index) => (
            <img
              key={index}
              src={url}
              alt={`Thumbnail ${index}`}
              className={`thumbnail ${index === currentIndex ? "active" : ""}`}
              onClick={() => handleThumbnailClick(index)}
            />
          ))}
        </div>
      </div>
    );
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

      {/* 🔍 Filters */}
      
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by Restaurant Name..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
      <div className="offer-grid">
      {Array.isArray(filteredScreens) && filteredScreens.length > 0 ? (
          filteredScreens.map((sc) => (
            <div className="offer-card" key={sc._id}
            >
               <ImageCarousel
                sc={sc}
                getAverageRating={getAverageRating}
                renderStars={renderStars}
              />
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
                <button
                  onClick={() => handleCardClick(sc.title)}
                  style={{ cursor: "pointer" }}
                  className="update-button"
                >
                  View Offer
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
