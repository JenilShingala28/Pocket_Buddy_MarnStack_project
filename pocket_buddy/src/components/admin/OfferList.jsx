import React, { useEffect, useState } from "react";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { CustomLoader } from "../common/CustomLoader";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";

export const OfferList = () => {
  const [offer, setOffer] = useState([]);
  const [isLoader, setIsLoader] = useState(false);

  const getAllOffer = async () => {
    try {
      setIsLoader(true);
      const res = await axios.get("/offer/getall");
      setOffer(res.data.data);
    } catch (error) {
      console.error("Error fetching locations:", error);
    } finally {
      setIsLoader(false);
    }
  };

  useEffect(() => {
    getAllOffer();
  }, []);

  const deleteOffer = async (id) => {
    try {
      setIsLoader(true);

      const res = await axios.delete(`/offer/delete/${id}`);
      if (res.status === 200) {
        toast.success("Record deleted successfully!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
          transition: Bounce,
        });

        // ✅ Remove deleted restaurant from state without re-fetching
        setOffer((prevLocations) =>
          prevLocations.filter((item) => item._id !== id)
        );
      }
    } catch (error) {
      console.error("Deletion error:", error);
      toast.error("Failed to delete record!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
        transition: Bounce,
      });
    } finally {
      setIsLoader(false);
    }
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 90 },
    { field: "restaurantName", headerName: "restaurants", width: 250 },
    { field: "title", headerName: "title", width: 250 },
    { field: "foodType", headerName: "foodType", width: 200 },
    { field: "description", headerName: "description", width: 400 },
    { field: "startDate", headerName: "startDate", width: 250 },
    { field: "endDate", headerName: "endDate", width: 150 },

    { field: "address", headerName: "address", width: 400 },

    // ✅ Display Image with Fixed Width and Height

    {
      field: "imageURL",
      headerName: "Image",
      width: 150,
      renderCell: (params) => (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <img
            src={params.row.imageURL}
            alt="offer"
            style={{
              margin: "5px",
              width: "100px", // Fixed width
              height: "100px", // Fixed height
              objectFit: "cover", // Ensures the image maintains aspect ratio
              borderRadius: "8px", // Rounded corners for better UI
              border: "1px solid #ddd", // Light border for visibility
              boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.1)", // Soft shadow for a modern look
            }}
          />
        </div>
      ),
    },
    // ✅ View Button
    {
      field: "view",
      headerName: "View",
      width: 100,
      renderCell: (params) => (
        <Link to="/admin/myoffer">
          <Button
            variant="contained"
            sx={{
              background: "#441752",
              color: "white",
              padding: "10px 15px",
              fontSize: "16px",
              border: "1px solid #EFB6C8",
              borderRadius: "5px",
              cursor: "pointer",
              width: "100%",
              boxShadow: "0 2px 15px #441752",
              "&:hover": {
                background: " #8174a0",
                color: " #fff",
                border: "1px solid #441752",
                boxShadow: "0 2px 15px #441752",
              },
            }}
          >
            View
          </Button>
        </Link>
      ),
    },

    // ✅ Delete Button
    {
      field: "delete",
      headerName: "Delete",
      width: 100,
      renderCell: (params) => (
        <Button
          variant="contained"
          sx={{
            background: "#441752",
            color: "white",
            padding: "10px 15px",
            fontSize: "16px",
            border: "1px solid #EFB6C8",
            borderRadius: "5px",
            cursor: "pointer",
            width: "100%",
            boxShadow: "0 2px 15px #441752",
            "&:hover": {
              background: " #8174a0",
              color: " #fff",
              border: "1px solid #441752",
              boxShadow: "0 2px 15px #441752",
            },
          }}
          // color="secondary"

          onClick={() => deleteOffer(params.row._id)}
        >
          Delete
        </Button>
      ),
    },
  ];

 
  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
          <ToastContainer
            position="top-left"
            autoClose={3000}
            hideProgressBar={false}
            closeOnClick
            pauseOnHover
            draggable
            theme="dark"
            transition={Bounce}
          />
    
          {isLoader == true && <CustomLoader />}
    
          <DataGrid
            rows={offer}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
            getRowId={(row) => row._id}
            getRowHeight={() => 110}
            sx={{
                "& .MuiDataGrid-root": {
                  backgroundColor: "#441752", // Background color for the entire grid
                },
                "& .MuiDataGrid-columnHeaders": {
                  backgroundColor: " #fff", // Column header background
                  color: " #441752", // White text for contrast
                  fontSize: "16px",
                },
                "& .MuiDataGrid-cell": {
                //   color: " #fff", // White text in cells
                  fontSize: "20px"
                },
                "& .MuiDataGrid-row": {
                  backgroundColor: " #8174a0", // Row background
                  color: "#fff", // Text color in rows
                  border: "1px solid black",
                  boxShadow: "0 2px 15px #441752",
                },
                "& .MuiDataGrid-row:hover": {
                  backgroundColor: " #efb6c8", // Lighter purple on hover
                  color: "#5a2673",
                },
                "& .MuiCheckbox-root": {
                  color: "#fff !important", // White checkbox
                },
              }}
          />
        </div>
  );
};
