import React, { useEffect, useState } from "react";
import { CustomLoader } from "../common/CustomLoader";
import axios from "axios";
import "../../assets/viewscreen.css"
import "../../assets/screencardperticuler.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Bounce, toast, ToastContainer } from "react-toastify";

export const ViewOffer = () => {
  const { restaurantName } = useParams(); // Get restaurant name from URL
    const navigate = useNavigate();
  
    const [screen, setScreen] = useState([]);
    const [filteredScreen, setFilteredScreen] = useState([]);
    const [isLoader, setisLoader] = useState(false);
  
    const [searchQuery, setSearchQuery] = useState(""); 
    const [foodType, setFoodType] = useState("");
    const [startDateFilter, setStartDateFilter] = useState("");
    const [endDateFilter, setEndDateFilter] = useState("");
  
    const [ratings, setRatings] = useState([]);

  const getAllRatings = async () => {
    try {
      const res = await axios.get("/rating/getall");
      setRatings(res.data.data);
    } catch (error) {
      console.error("Error fetching ratings:", error);
    }
  };

  const getAllOfferMyScreen = async () => {
    console.log(localStorage.getItem("id"));

    setisLoader(true);
    const res = await axios.get(
       "/offer/byperuser/" + localStorage.getItem("id")
      // "/offer/getall"
    );
    console.log(res.data);
    setScreen(res.data.data);
    setisLoader(false);
  };

  useEffect(() => {
    getAllOfferMyScreen();
    getAllRatings();
  }, []);

  // Function to calculate the average rating for an offer

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

  const deleteOffer = async (id) => {
    try {
      setisLoader(true);

      const res = await axios.delete("/offer/delete/" + id);
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
        getAllOfferMyScreen(); //get -->
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

   // Apply all filters
    useEffect(() => {
      const filtered = screen.filter((sc) => {
        const matchesSearch = sc.restaurantName
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase());
  
        const matchesFoodType = foodType
          ? sc.foodType?.toLowerCase() === foodType.toLowerCase()
          : true;
  
        const matchesStartDate = startDateFilter
          ? new Date(sc.startDate) >= new Date(startDateFilter)
          : true;
  
        const matchesEndDate = endDateFilter
          ? new Date(sc.endDate) <= new Date(endDateFilter)
          : true;
  
          const matchesRestaurant = restaurantName
          ? sc.restaurantName?.toLowerCase() ===
            decodeURIComponent(restaurantName).toLowerCase()
          : true;
  
        return (
          matchesSearch && matchesFoodType && matchesStartDate && matchesEndDate &&
          matchesRestaurant
        );
      });
  
      setFilteredScreen(filtered);
    }, [searchQuery, foodType, startDateFilter, endDateFilter, screen,
      restaurantName,]);

  const handleCardClick = (restaurantName) => {
    navigate(`/owner/ratings/${encodeURIComponent(restaurantName)}`);
  }

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
      <h2 className="title">OUR OFFER</h2>

      <div className="search-bar">
          <input
            type="text"
            placeholder="Search by Restaurant Name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="filter-bar">
        <label>Food Type:</label>
        <select value={foodType} onChange={(e) => setFoodType(e.target.value)}>
          <option value="">All Food Types</option>
          <option value="burger">burger</option>
          <option value="pizza">pizza</option>
          <option value="coffee">coffee</option>
          <option value="pasta">pasta</option>
          <option value="Dessert">Dessert</option>
        </select>

        <label>Start Date:</label>
        <input
          type="date"
          value={startDateFilter}
          onChange={(e) => setStartDateFilter(e.target.value)}
        />
        <label>End Date:</label>
        <input
          type="date"
          value={endDateFilter}
          onChange={(e) => setEndDateFilter(e.target.value)}
        />
      </div>

      <div className="offer-grid">
      {Array.isArray(filteredScreen) && filteredScreen.length > 0 ? (
          filteredScreen.map((sc) => (
            <div className="offer-card" key={sc._id}>
              <div className="image-container">
                <img
                  src={sc?.imageURL || "https://via.placeholder.com/200"}
                  alt="Screen"
                  className="screen-image"
                />
                <div className="rating-overlay"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent card click propagation
                  handleCardClick(sc.restaurantName); // Use actual restaurant name
                }}
                >
                  {renderStars(Number(getAverageRating(sc.restaurantName)))}
                  <span className="rating-value">
                    ({getAverageRating(sc.restaurantName)})
                  </span>
                </div>
              </div>
              <div className="screen-details">
              <div className="info">
                  <strong>Restaurant Name:</strong> {sc.restaurantName || "No Description"}
                </div>
                <div className="info">
                  <strong>Offer Name:</strong> {sc.title || "No Description"}
                </div>
                <div className="info">
                  <strong>Description:</strong>{" "}
                  {sc.description || "No Description"}
                </div>
                <div className="info">
                  <strong>Location:</strong> {sc.address || "N/A"}
                </div>
                <div className="info">
                  <strong>Start Date:</strong> {sc.startDate || "N/A"}
                </div>
                <div className="info">
                  <strong>End Date:</strong> {sc.endDate || "N/A"}
                </div>
                <div className="info">
                  <strong>Food Type:</strong> {sc.foodType || "N/A"}
                </div>
                <div className="info">
                  <strong>TERMS & CONDITIONS:</strong>{" "}
                  {sc.termsConditions || "N/A"}
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
                    {renderStars(Number(getAverageRating(sc.restaurantName)))}
                    <span
                      style={{
                        marginLeft: "6px",
                        marginTop: "5px",
                        color: "#444",
                        fontSize: "14px",
                      }}
                    >
                      ({getAverageRating(sc.restaurantName)})
                    </span>
                  </div>
                </div>
                <Link
                  to={`/owner/updateoffer/${sc._id}`}
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
