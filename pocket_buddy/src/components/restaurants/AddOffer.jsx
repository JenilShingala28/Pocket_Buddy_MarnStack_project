import React from "react";
import { useForm } from "react-hook-form";
import "../../assets/addlocation.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const AddOffer = () => {
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
      console.log(data.image[0]);

      const formData = new FormData();
      formData.append("restaurantName", data.restaurantName);
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("startDate", data.startDate);
      formData.append("endDate", data.endDate);
      formData.append("address", data.address);
      formData.append("foodType", data.foodType);
      formData.append("termsConditions", data.termsConditions);
      formData.append("image", data.image[0]);
      formData.append("userId", data.userId);

      const res = await axios.post("/offer/offerfile", formData);
      console.log("add offer successfully:", res.data);
    } catch (err) {
      console.error("Axios Error:", err.message);
    }

    navigate("/owner/myoffer");
  };

  const ValidationSchema = {
    titlevalidator: {
      required: { value: true, message: "Title is required" },
    },
    descriptionvalidator: {
      required: { value: true, message: "Description is required" },
    },
    startDateValidator: {
      required: { value: true, message: "Start Date is required" },
    },
    endDateValidator: {
      required: { value: true, message: "End Date is required" },
    },
    typevalidator: {
      required: { value: true, message: "Food type is required" },
    },
    termsvalidator: {
      required: {
        value: true,
        message: "You must accept the Terms & Conditions",
      },
    },
    addressvalidator: {
      required: { value: true, message: "address is required" },
    },
  };

  return (
    <div className="form-container">
      <h1>OFFER SCREEN</h1>
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
          <label>OFFER NAME</label>
          <input
            type="text"
            placeholder="Enter title"
            {...register("title", ValidationSchema.titlevalidator)}
          />
          <span className="error-message">{errors.title?.message}</span>
        </div>

        <div className="form-group">
          <label>DESCRIPTION</label>
          <input
            type="text"
            placeholder="Enter description"
            {...register("description", ValidationSchema.descriptionvalidator)}
          />
          <span style={{ color: "red", fontSize: "12px" }}>
            {errors.description?.message}
          </span>
        </div>

        <div className="form-group">
          <label>FOOD TYPES</label>
          <select {...register("foodType", ValidationSchema.typevalidator)}>
            <option value="">SELECT</option>
            <option value="burger">Burger</option>
            <option value="pizza">Pizza</option>
            <option value="coffee">Coffee</option>
            <option value="pasta">Pasta</option>
            <option value="dessert">dessert</option>
          </select>
          <span style={{ color: "red", fontSize: "12px" }}>
            {errors.foodType?.message}
          </span>
        </div>

        <div className="form-group">
          <label>Start Date</label>
          <input
            type="date"
            {...register("startDate", ValidationSchema.startDateValidator)}
          />
          <span style={{ color: "red", fontSize: "12px" }}>
            {errors.startDate?.message}
          </span>
        </div>

        <div className="form-group">
          <label>End Date</label>
          <input
            type="date"
            {...register("endDate", ValidationSchema.endDateValidator)}
          />
          <span style={{ color: "red", fontSize: "12px" }}>
            {errors.endDate?.message}
          </span>
        </div>
        <div className="form-group">
          <label>ADDRESS</label>
          <input
            type="text"
            placeholder="Enter address"
            {...register("address", ValidationSchema.addressvalidator)}
          ></input>
          <span style={{ color: "red", fontSize: "12px" }}>
            {errors.address?.message}
          </span>
        </div>
        <div className="form-group">
          <label>Add Image</label>
          <input type="file" {...register("image")}></input>
        </div>

        <div className="form-checkbox">
          <input
            type="checkbox"
            {...register("termsConditions", ValidationSchema.termsvalidator)}
          />
          <label>Accept Terms & Conditions</label>
          <span style={{ color: "red", fontSize: "12px" }}>
            {errors.termsConditions?.message}
          </span>
        </div>

        <div>
          <input type="submit" className="submit-button" />
        </div>
      </form>
    </div>
  );
};

{
  /* <body style={{backgroundColor:"rgba(246, 174, 81, 0.685)"}}>
        <div className="d-flex justify-content-center align-items-center vh-100" style={{boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.77)"}}>
      <div className="card card-warning card-outline mb-4" style={{ width: "40rem" }}>
        <div className="card-header">
          <div className="card-title">Add Restaurant Offer</div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="card-body">
            <div className="row mb-3">
              <label className="col-sm-4 col-form-label">Restaurant Name</label>
              <div className="col-sm-8">
                <input
                  type="text"
                  className="form-control"
                  name="restaurantName"
                  value={formData.restaurantName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="row mb-3">
              <label className="col-sm-4 col-form-label">Offer Details</label>
              <div className="col-sm-8">
                <textarea
                  className="form-control"
                  name="offerDetails"
                  value={formData.offerDetails}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
            </div>
            <div className="row mb-3">
              <label className="col-sm-4 col-form-label">Discount (%)</label>
              <div className="col-sm-8">
                <input
                  type="number"
                  className="form-control"
                  name="discount"
                  value={formData.discount}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="row mb-3">
              <label className="col-sm-4 col-form-label">Start Date</label>
              <div className="col-sm-8">
                <input
                  type="date"
                  className="form-control"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="row mb-3">
              <label className="col-sm-4 col-form-label">End Date</label>
              <div className="col-sm-8">
                <input
                  type="date"
                  className="form-control"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-sm-8 offset-sm-4">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="termsAccepted"
                    checked={formData.termsAccepted}
                    onChange={handleChange}
                  />
                  <label className="form-check-label">
                    Accept Terms & Conditions
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="card-footer text-center">
            <button type="submit" className="btn btn-warning me-2">
              Submit Offer
            </button>
            <button type="reset" className="btn btn-secondary">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
    </body> */
}
