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
  }, []);

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
              <img
                src={sc?.imageURL || "https://via.placeholder.com/200"}
                alt="Screen"
                className="screen-image"
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
