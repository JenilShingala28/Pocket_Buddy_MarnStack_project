import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { CustomLoader } from "../common/CustomLoader";

export const RestaurentList = () => {
  const [location, setLocation] = useState([]);
  const [isLoader, setIsLoader] = useState(false);

  const getAllLocation = async () => {
    try {
      setIsLoader(true);
      const res = await axios.get("/location/getall");
      setLocation(res.data.data);
    } catch (error) {
      console.error("Error fetching locations:", error);
    } finally {
      setIsLoader(false);
    }
  };

  useEffect(() => {
    getAllLocation();
  }, []);

  const deleteLocation = async (id) => {
    try {
      setIsLoader(true);

      const res = await axios.delete(`/location/delete/${id}`);
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
        setLocation((prevLocations) =>
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
    { field: "title", headerName: "Restaurants", width: 250 },
    { field: "category", headerName: "Category", width: 200 },
    { field: "description", headerName: "Description", width: 400 },
    { field: "timing", headerName: "Timing", width: 250 },
    { field: "address", headerName: "Address", width: 400 },
    { field: "foodType", headerName: "Food Type", width: 200 },

    {
      field: "stateId",
      headerName: "State",
      width: 150,
      renderCell: (params) => <span>{params.row?.stateId?.name || "N/A"}</span>,
    },
    {
      field: "cityId",
      headerName: "City",
      width: 150,
      renderCell: (params) => <span>{params.row?.cityId?.name || "N/A"}</span>,
    },
    {
      field: "areaId",
      headerName: "Area",
      width: 150,
      renderCell: (params) => <span>{params.row?.areaId?.name || "N/A"}</span>,
    },

    // ✅ Image Column with Fixed Width & Height
    {
      field: "imageURL",
      headerName: "Image",
      width: 150,
      renderCell: (params) => (
        <img
          src={params.row.imageURL || "https://via.placeholder.com/100"}
          alt="Restaurant"
          style={{
            width: "100px",
            height: "100px",
            objectFit: "cover",
            borderRadius: "8px",
            border: "1px solid #ddd",
            boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.1)",
          }}
        />
      ),
    },

    // ✅ View Button
    {
      field: "view",
      headerName: "View",
      width: 150,
      renderCell: (params) => (
        <Link to="/admin/myresto">
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
                background: "#8174a0",
                color: "#fff",
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
              background: "#8174a0",
              color: "#fff",
              border: "1px solid #441752",
              boxShadow: "0 2px 15px #441752",
            },
          }}
          onClick={() => deleteLocation(params.row._id)}
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
        rows={location}
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
            // color: " #fff",// White text in cells
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
