import axios from 'axios';
import React from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

export const UpdateOprofile = () => {
    const id = useParams().id;

    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm({
      defaultValues: async () => {
        const res = await axios.get("/userby/" + id);
        return res.data.data;
      },
    });
  
    const navigate = useNavigate();
  
    const submitHandler = async (data) => {
      data.userId = localStorage.getItem("id");
      delete data._id;
      console.log(data);
  
      const res = await axios.put("/updateoprofileby/" + id, data);
      console.log(res.data);
  
      navigate("/viewoprofile");
    };
  
    const ValidationSchema = {
      firstNamevalidator: {
        required: { value: true, message: "firstName is required" },
      },
      lastNamevalidator: {
        required: { value: true, message: "lastName is required" },
      },
      emailvalidator: {
        pattern: {
          value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          required: { value: true, message: "email is required" },
        },
      },
      addressvalidator: {
        required: { value: true, message: "address is required" },
      },
      contactvalidator: {
        required: { value: true, message: "Contact is required" },
        pattern: {
          value: /^[6-9]{1}[0-9]{9}$/,
          message: "Contact is not valid...",
        },
      },
    };

  return (
    <div className="app-main">
      <div className="form-container">
        <h1>OWNER PROFILE</h1>
        <form onSubmit={handleSubmit(submitHandler)}>
          <div className="form-group">
            <label>FIRST NAME</label>
            <input
              type="text"
              placeholder="Enter title"
              {...register("firstName", ValidationSchema.firstNamevalidator)}
            ></input>
            <span style={{ color: "red", fontSize: "12px" }}>
              {errors.firstName?.message}
            </span>
          </div>
          <div className="form-group">
            <label>LAST NAME</label>
            <input
              type="text"
              placeholder="Enter description"
              {...register("lastName", ValidationSchema.lastNamevalidator)}
            ></input>
            <span style={{ color: "red", fontSize: "12px" }}>
              {errors.lastName?.message}
            </span>
          </div>
          <div className="form-group">
            <label>EMAIL</label>
            <input
              type="text"
              placeholder="Enter timing"
              {...register("email", ValidationSchema.emailvalidator)}
            ></input>
            <span style={{ color: "red", fontSize: "12px" }}>
              {errors.email?.message}
            </span>
          </div>
          <div className="form-group">
            <label>CONTACT</label>
            <input
              type="text"
              placeholder="Enter Contact"
              {...register("contact", ValidationSchema.contactvalidator)}
            />
            <span style={{ color: "red", fontSize: "12px" }}>
              {errors.contact?.message}
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
          <div>
            <input type="submit" className="submit-button"></input>
          </div>
        </form>
      </div>
    </div>
  )
}
