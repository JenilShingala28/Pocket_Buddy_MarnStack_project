import React, { useEffect, useState } from "react";
import hamburgermenu from "../../assets/images/hamburgermenu.png";
import { Link } from "react-router-dom";

export const UserNavbar = ({ toggleSidebar }) => {
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
          to="/user"
          style={{ marginLeft: "20px" }}
        >
          🍽️ POCKET BUDDY
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
            <li className="nav-item" style={{ paddingTop: "9px" }}>
              <Link className="nav-link" to="/userprofile">
                ADD PROFILE
              </Link>
            </li>
            <li className="nav-item" style={{ paddingBottom: "12px" }}>
              <Link className="nav-link" to="/adprofile">
                {/* VIEW PROFILE */}
                <img
                  src={profileImg || "https://via.placeholder.com/50"}
                  alt="User Avatar"
                  style={{
                    width: "40px",
                    height: "45px",
                    objectFit: "cover",

                    border: "1px solid #441752",
                    boxShadow: " 0 2px 15px #efb6c8",
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

            <li className="nav-item" style={{ paddingTop: "9px" }}>
              <Link
                className="nav-link btn btn-warning text-light px-3"
                to="/"
                style={{
                  transition: "0.3s",
                  padding: 7,
                  
                  border: "1px solid #8174a0",
                  boxShadow:" 0 2px 15px #efb6c8",
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

// <nav className="navbar navbar-expand-lg navbar-dark px-4" style={{backgroundColor:"rgb(68, 23, 82)"}}>
//       <div className="container-fluid">

//         <Link className="navbar-brand" to="/user">
//           🍽️ Pocket Buddy
//         </Link>
//         <button
//           className="navbar-toggler"
//           type="button"
//           data-bs-toggle="collapse"
//           data-bs-target="#navbarNav"
//           aria-controls="navbarNav"
//           aria-expanded="false"
//           aria-label="Toggle navigation"
//         >
//           <span className="navbar-toggler-icon"></span>
//         </button>
//         <div className="collapse navbar-collapse" id="navbarNav">
//           <ul className="navbar-nav ms-auto">
//             <li className="nav-item">
//               <Link className="nav-link" to="/userprofile">
//                 Profile
//               </Link>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link" to="/addoffer">
//                 Add Offer
//               </Link>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link" to="/restaurant-orders">
//                 Orders
//               </Link>
//             </li>
//             <li className="nav-item" >
//               <Link className="nav-link btn btn-warning text-light px-3" to="/logout"
//               style={{ transition: "0.3s" }}
//               onMouseEnter={(e) => (e.target.style.backgroundColor = "rgb(168, 136, 181)")}
//               onMouseLeave={(e) => (e.target.style.backgroundColor = "")}>
//                 Logout
//               </Link>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </nav>

// <nav className="app-header navbar navbar-expand bg-body">

//   <div className="container-fluid">

//     <ul className="navbar-nav">
//       <li className="nav-item">
//         <a
//           className="nav-link"
//           data-lte-toggle="sidebar"
//           href="#"
//           role="button"
//         >
//           <i className="bi bi-list" />
//         </a>
//       </li>
//       <li className="nav-item d-none d-md-block">
//         <a href="#" className="nav-link">
//           Home
//         </a>
//       </li>
//       <li className="nav-item d-none d-md-block">
//         <a href="#" className="nav-link">
//           Contact
//         </a>
//       </li>
//     </ul>

//     <ul className="navbar-nav ms-auto">

//       <li className="nav-item">
//         <a
//           className="nav-link"
//           data-widget="navbar-search"
//           href="#"
//           role="button"
//         >
//           <i className="bi bi-search" />
//         </a>
//       </li>
//       <li className="nav-item dropdown">
//         <a className="nav-link" data-bs-toggle="dropdown" href="#">
//           <i className="bi bi-chat-text" />
//           <span className="navbar-badge badge text-bg-danger">3</span>
//         </a>
//         <div className="dropdown-menu dropdown-menu-lg dropdown-menu-end">
//           <a href="#" className="dropdown-item">
//             <div className="d-flex">
//               <div className="flex-shrink-0">
//                 <img
//                   src="../../dist/assets/img/user1-128x128.jpg"
//                   alt="User Avatar"
//                   className="img-size-50 rounded-circle me-3"
//                 />
//               </div>
//               <div className="flex-grow-1">
//                 <h3 className="dropdown-item-title">
//                   Brad Diesel
//                   <span className="float-end fs-7 text-danger">
//                     <i className="bi bi-star-fill" />
//                   </span>
//                 </h3>
//                 <p className="fs-7">Call me whenever you can...</p>
//                 <p className="fs-7 text-secondary">
//                   <i className="bi bi-clock-fill me-1" /> 4 Hours Ago
//                 </p>
//               </div>
//             </div>
//           </a>
//           <div className="dropdown-divider" />
//           <a href="#" className="dropdown-item">
//             <div className="d-flex">
//               <div className="flex-shrink-0">
//                 <img
//                   src="../../dist/assets/img/user8-128x128.jpg"
//                   alt="User Avatar"
//                   className="img-size-50 rounded-circle me-3"
//                 />
//               </div>
//               <div className="flex-grow-1">
//                 <h3 className="dropdown-item-title">
//                   John Pierce
//                   <span className="float-end fs-7 text-secondary">
//                     <i className="bi bi-star-fill" />
//                   </span>
//                 </h3>
//                 <p className="fs-7">I got your message bro</p>
//                 <p className="fs-7 text-secondary">
//                   <i className="bi bi-clock-fill me-1" /> 4 Hours Ago
//                 </p>
//               </div>
//             </div>
//           </a>
//           <div className="dropdown-divider" />
//           <a href="#" className="dropdown-item">
//             <div className="d-flex">
//               <div className="flex-shrink-0">
//                 <img
//                   src="../../dist/assets/img/user3-128x128.jpg"
//                   alt="User Avatar"
//                   className="img-size-50 rounded-circle me-3"
//                 />
//               </div>
//               <div className="flex-grow-1">
//                 <h3 className="dropdown-item-title">
//                   Nora Silvester
//                   <span className="float-end fs-7 text-warning">
//                     <i className="bi bi-star-fill" />
//                   </span>
//                 </h3>
//                 <p className="fs-7">The subject goes here</p>
//                 <p className="fs-7 text-secondary">
//                   <i className="bi bi-clock-fill me-1" /> 4 Hours Ago
//                 </p>
//               </div>
//             </div>
//           </a>
//           <div className="dropdown-divider" />
//           <a href="#" className="dropdown-item dropdown-footer">
//             See All Messages
//           </a>
//         </div>
//       </li>
//       <li className="nav-item dropdown">
//         <a className="nav-link" data-bs-toggle="dropdown" href="#">
//           <i className="bi bi-bell-fill" />
//           <span className="navbar-badge badge text-bg-warning">15</span>
//         </a>
//         <div className="dropdown-menu dropdown-menu-lg dropdown-menu-end">
//           <span className="dropdown-item dropdown-header">
//             15 Notifications
//           </span>
//           <div className="dropdown-divider" />
//           <a href="#" className="dropdown-item">
//             <i className="bi bi-envelope me-2" /> 4 new messages
//             <span className="float-end text-secondary fs-7">3 mins</span>
//           </a>
//           <div className="dropdown-divider" />
//           <a href="#" className="dropdown-item">
//             <i className="bi bi-people-fill me-2" /> 8 friend requests
//             <span className="float-end text-secondary fs-7">12 hours</span>
//           </a>
//           <div className="dropdown-divider" />
//           <a href="#" className="dropdown-item">
//             <i className="bi bi-file-earmark-fill me-2" /> 3 new reports
//             <span className="float-end text-secondary fs-7">2 days</span>
//           </a>
//           <div className="dropdown-divider" />
//           <a href="#" className="dropdown-item dropdown-footer">
//             {" "}
//             See All Notifications{" "}
//           </a>
//         </div>
//       </li>
//       <li className="nav-item">
//         <a className="nav-link" href="#" data-lte-toggle="fullscreen">
//           <i data-lte-icon="maximize" className="bi bi-arrows-fullscreen" />
//           <i
//             data-lte-icon="minimize"
//             className="bi bi-fullscreen-exit"
//             style={{ display: "none" }}
//           />
//         </a>
//       </li>
//       <li className="nav-item dropdown user-menu">
//         <a
//           href="#"
//           className="nav-link dropdown-toggle"
//           data-bs-toggle="dropdown"
//         >
//           <img
//             src="../../dist/assets/img/user2-160x160.jpg"
//             className="user-image rounded-circle shadow"
//             alt="User Image"
//           />
//           <span className="d-none d-md-inline">Alexander Pierce</span>
//         </a>
//         <ul className="dropdown-menu dropdown-menu-lg dropdown-menu-end">
//           <li className="user-header text-bg-primary">
//             <img
//               src="../../dist/assets/img/user2-160x160.jpg"
//               className="rounded-circle shadow"
//               alt="User Image"
//             />
//             <p>
//               Alexander Pierce - Web Developer
//               <small>Member since Nov. 2023</small>
//             </p>
//           </li>
//           <li className="user-body">
//             <div className="row">
//               <div className="col-4 text-center">
//                 <a href="#">Followers</a>
//               </div>
//               <div className="col-4 text-center">
//                 <a href="#">Sales</a>
//               </div>
//               <div className="col-4 text-center">
//                 <a href="#">Friends</a>
//               </div>
//             </div>
//           </li>
//           <li className="user-footer">
//             <a href="#" className="btn btn-default btn-flat">
//               Profile
//             </a>
//             <a href="#" className="btn btn-default btn-flat float-end">
//               Sign out
//             </a>
//           </li>
//         </ul>
//       </li>
//     </ul>
//   </div>
// </nav>
