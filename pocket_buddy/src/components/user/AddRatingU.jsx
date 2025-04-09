import axios from 'axios';
import React from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import "../../assets/addlocation.css";

export const AddRatingU = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();
    
      const navigate = useNavigate();
    
      const submitHandler = async (data) => {
        try {
          data.userId = localStorage.getItem("id");
          console.log(data);
    
          const res = await axios.post("/rating/add", data, {
            headers: {
              "Content-Type": "application/json", // Ensures the server interprets it as JSON
            },
          });
          console.log("add rating successfully:", res.data);
        } catch (err) {
          console.error("Axios Error:", err.message);
        }
    
        navigate("/user/myrating");
      };
    
      const ValidationSchema = {
        commentsvalidator: {
          required: { value: true, message: "comments is required" },
        },
        ratingvalidator: {
          required: { value: true, message: "rating is required" },
          min: { value: 1, message: "Rating must be at least 1" },
          max: { value: 5, message: "Rating cannot be more than 5" },
        },
        titlevalidator: {
          required: { value: true, message: "title is required" },
        },
      };
  return (
    <div className="form-container">
    <h1>RATING SCREEN</h1>
    <form onSubmit={handleSubmit(submitHandler)}>
    <div className="form-group">
          <label>RESTAURANT NAME</label>
          <input
            type="text"
            placeholder="Enter title"
            {...register("restaurantName", ValidationSchema.titlevalidator)}
          ></input>
          <span style={{ color: "red", fontSize: "12px" }}>
            {errors.restaurantName?.message}
          </span>
        </div>
      <div className="form-group">
        <label>COMMENTS</label>
        <input
          type="text"
          placeholder="Enter comments"
          {...register("comments", ValidationSchema.commentsvalidator)}
        />
        <span style={{ color: "red", fontSize: "12px" }}>
          {errors.comments?.message}
        </span>
      </div>

      <div className="form-group">
        <label>RATING</label>
        <input
          type="number"
          placeholder="Enter rating 1 - 5"
          {...register("rating", ValidationSchema.ratingvalidator)}
        />
        <span style={{ color: "red", fontSize: "12px" }}>
          {errors.rating?.message}
        </span>
      </div>

      <div>
        <input type="submit" className="submit-button" />
      </div>
    </form>
  </div>
  )
}
