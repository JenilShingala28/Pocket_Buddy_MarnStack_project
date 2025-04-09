import React, { useState } from "react";
import { UserNavbar } from "./UserNavbar";
import { Link, Outlet } from "react-router-dom";
import "../../assets/sidebar.css";

export const UserSidebar = () => {
  //for closing sidebar...
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    console.log("toggleSidebar");
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <UserNavbar toggleSidebar={toggleSidebar} />

      <aside
        className={`app-sidebar body-secondary shadow ${
          isSidebarOpen ? "open" : "d-none"
        }`}
        data-bs-theme="dark"
      >
        <div className="sidebar-brand">
          <a href="/user" className="brand-link">
            {/* <img
              src="/lo.webp"
              // alt="AdminLTE Logo"
              style={{width:"50px",height:"100px"}}
              className="brand-image opacity-75 shadow"
            /> */}

            <span className="brand-text fw-light">
              {" "}
              <strong style={{color:"white" , fontSize:"20px"}}> 🍽️ POCKET BUDDY</strong>
            </span>
          </a>
        </div>

        <div
          className=""
          data-overlayscrollbars-viewport="scrollbarHidden overflowXHidden overflowYScroll"
          tabIndex={-1}
          style={{
            marginRight: "-16px",
            marginBottom: "-16px",
            marginLeft: 0,
            top: "-8px",
            right: "auto",
            left: "-8px",
            width: "calc(100% + 16px)",
            padding: 8,
          }}
        >
          <nav className="mt-2">
            <ul
              className="nav sidebar-menu flex-column"
              data-lte-toggle="treeview"
              role="menu"
              data-accordion="false"
            >
              <li className="nav-item menu-open">
                {/* <Link to="addlocation2" className="nav-link active">
                  <i className="nav-icon bi bi-speedometer" />
                  <p>
                    Restaurant Add Screen
                    <i className="nav-arrow bi bi-chevron-right" />
                  </p>
                </Link> */}
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <Link to="myresto" className="nav-link active">
                      <i className="nav-icon bi bi-circle" />
                      <p>VIEW RESTAURANTS</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    {/* <Link to="addoffer" className="nav-link">
                      <i className="nav-icon bi bi-circle" />
                      <p>Add Offer</p>
                    </Link> */}
                  </li>
                  <li className="nav-item">
                    <Link to="myoffer" className="nav-link active">
                      <i className="nav-icon bi bi-circle" />
                      <p>VIEW OFFER</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="addrating" className="nav-link">
                      <i className="nav-icon bi bi-circle" />
                      <p>ADD RATING</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="myrating" className="nav-link active">
                      <i className="nav-icon bi bi-circle" />
                      <p>VIEW MY RATING</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="allrating" className="nav-link active">
                      <i className="nav-icon bi bi-circle" />
                      <p>VIEW ALL RATING</p>
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </aside>
      <main className="app-main">
        <Outlet></Outlet>
      </main>
    </>
  );
};
