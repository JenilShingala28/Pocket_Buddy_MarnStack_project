import React, { useEffect, useState } from "react";
import hamburgermenu from "../../assets/images/hamburgermenu.png";
import resto from "../../assets/images/resto.jpg"
import { Link } from "react-router-dom";

export const OwnerNavbar = ({ toggleSidebar }) => {
  const [clicked, setClicked] = useState(false);

  const handleToggleClick = () => {
    setClicked(!clicked);
    toggleSidebar(); // maintain original functionality
  };

  const [profileImg, setProfileImg] = useState("");
  
    useEffect(() => {
      const storedImage = localStorage.getItem("profileImage");
      if (storedImage) {
        setProfileImg(storedImage);
      }
    }, []);
  

  return (
    <nav
      className="app-header navbar navbar-expand navbar-expand-lg navbar-dark"
      style={{ backgroundColor: "rgb(68, 23, 82)" }}
    >
      {/*begin::Container*/}
      <div className="container-fluid">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a
              className="nav-link btn btn-light"
              href="#"
              role="button"
              style={{
                color: "black",
                backgroundColor: clicked ? " #441752" : " #EFB6C8", // toggle background
                padding: "5px 10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
              }}
              //onClick={toggleSidebar}
              onClick={handleToggleClick}
            >
              <img
                src={hamburgermenu}
                style={{ height: "25px", width: "25px" }}
              ></img>
            </a>
          </li>
        </ul>

        <Link
          className="navbar-brand"
          to="/owner"
          style={{ marginLeft: "20px" }}
        >
          🍽️ Pocket Buddy
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item"  style={{paddingTop:"9px"}}>
              <Link className="nav-link" to="/oprofile">
                ADD PROFILE
              </Link>
            </li>
            <li className="nav-item" style={{ paddingBottom: "12px" }}>
              <Link className="nav-link" to="/viewoprofile">
                {/* VIEW PROFILE */}
                <img
                  src={profileImg || resto}
                  
                  style={{
                    width: "40px",
                    height: "45px",
                    objectFit: "cover",

                    border: "1px solid #441752",
                    boxShadow: " 0 2px 10px rgba(239, 182, 200, 0.45)",
                    backgroundColor: "#fff",
                    transition: "transform 0.2s ease-in-out",
                  }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.transform = "scale(1.05)")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                />
              </Link>
            </li>

            <li className="nav-item"  style={{paddingTop:"9px"}}>
              <Link
                className="nav-link btn btn-warning text-light px-3"
                to="/"
                style={{
                  transition: "0.3s",
                  padding: 7,
                  border: "1px solid #8174a0",
                  boxShadow:" 0 2px 10px rgba(239, 182, 200, 0.36)",
                }}
                onClick={() => {
                  localStorage.clear();
                }}
              >
                LOGOUT
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
