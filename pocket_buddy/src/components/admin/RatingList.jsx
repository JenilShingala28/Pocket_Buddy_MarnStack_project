import { Button } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { CustomLoader } from "../common/CustomLoader";
import { DataGrid } from "@mui/x-data-grid";

export const RatingList = () => {
  const [Rating, setRating] = useState([]);
  const [isLoader, setIsLoader] = useState(false);

  const getAllRating = async () => {
    try {
      setIsLoader(true);
      const res = await axios.get("/rating/getall");
      setRating(res.data.data);
    } catch (error) {
      console.error("Error fetching locations:", error);
    } finally {
      setIsLoader(false);
    }
  };

  useEffect(() => {
    getAllRating();
  }, []);

  const deleteRating = async (id) => {
    try {
      setIsLoader(true);

      const res = await axios.delete(`/rating/delete/${id}`);
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
        setRating((prevLocations) =>
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
    {
      field: "userId",
      headerName: "User ID",
      width: 250,
      renderCell: (params) => <span>{params.row?.userId?._id || "N/A"}</span>,
    },
    {
      field: "userName",
      headerName: "User Name",
      width: 200,
      renderCell: (params) => (
        <span>
          {params.row?.userId?.firstName || "N/A"}{" "}
          {params.row?.userId?.lastName || ""}
        </span>
      ),
    },
    { field: "restaurantName", headerName: "restaurantName", width: 250 },
    { field: "comments", headerName: "comments", width: 400 },
    { field: "rating", headerName: "rating", width: 100 },
    
    // ✅ View Button
    {
      field: "view",
      headerName: "View",
      width: 100,
      renderCell: (params) => (
        <Link to="/admin/allrating">
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

          onClick={() => deleteRating(params.row._id)}
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
        rows={Rating}
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
            // color: " #441752", // White text in cells
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
            color: " #5a2673",
          },
          "& .MuiCheckbox-root": {
            color: "#fff !important", // White checkbox
          },
        }}
      />
    </div>
  );
};
