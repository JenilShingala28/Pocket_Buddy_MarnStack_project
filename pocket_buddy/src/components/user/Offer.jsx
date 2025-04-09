import React, { useEffect, useState } from "react";
import { CustomLoader } from "../common/CustomLoader";
import "../../assets/screencard.css";
import axios from "axios";

export const Offer = () => {


  const [screen, setScreen] = useState([]);
  const [filteredScreen, setFilteredScreen] = useState([]);
  const [isLoader, setisLoader] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [foodType, setFoodType] = useState("");
  const [startDateFilter, setStartDateFilter] = useState("");
  const [endDateFilter, setEndDateFilter] = useState("");

  const getAllOfferMyScreen = async () => {
    setisLoader(true);
    try {
      const res = await axios.get("/offer/getall");
      setScreen(res.data.data);
      setFilteredScreen(res.data.data);
    } catch (error) {
      console.error("Error fetching offers:", error);
    }
    setisLoader(false);
  };

  useEffect(() => {
    getAllOfferMyScreen();
  }, []);

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

      return (
        matchesSearch && matchesFoodType && matchesStartDate && matchesEndDate
      );
    });

    setFilteredScreen(filtered);
  }, [searchQuery, foodType, startDateFilter, endDateFilter, screen]);

  return (

    <div className="screen-container">
      {isLoader && <CustomLoader />}
      <h2 className="title">OUR OFFER</h2>

      {/* 🔍 Filters */}
      
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

      {/* 📦 Offer Cards */}
      <div className="screen-grid">
        {Array.isArray(filteredScreen) && filteredScreen.length > 0 ? (
          filteredScreen.map((sc) => (
            <div className="screen-card" key={sc._id}>
              <img
                src={sc?.imageURL || "https://via.placeholder.com/200"}
                alt="Screen"
                className="screen-image"
              />
              <div className="screen-details">
                <div className="info">
                  <strong>Restaurant Name:</strong> {sc.restaurantName || "N/A"}
                </div>
                <div className="info">
                  <strong>Offer Name:</strong> {sc.title || "N/A"}
                </div>
                <div className="info">
                  <strong>Description:</strong> {sc.description || "N/A"}
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
                  <strong>Terms & Conditions:</strong>{" "}
                  {sc.termsConditions || "N/A"}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="no-data">No offers available</p>
        )}
      </div>
    </div>
  );
};
