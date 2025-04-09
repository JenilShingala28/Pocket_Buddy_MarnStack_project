import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

export const UpdateOffer = () => {
  const id = useParams().id;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: async () => {
      const res = await axios.get("/offer/offerby/" + id);
      return res.data.data;
    },
  });

  const navigate = useNavigate();

  const submitHandler = async (data) => {
    data.userId = localStorage.getItem("id");
    delete data._id;
    console.log(data);

    const res = await axios.put("/offer/updateofferby/" + id, data);
    console.log(res.data);

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
