import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

export const UpdateMyScreen = () => {
  const id = useParams().id;

  const [State, setState] = useState([]);
  const [City, setCity] = useState([]);
  const [Area, setArea] = useState([]);

  const getAllState = async () => {
    const res = await axios.get("/state/getallstate");
    console.log(res.data);
    setState(res.data.data);
  };

  const getCityByStateId = async (id) => {
    const res = await axios.get("/city/getallcitybystate/" + id);
    console.log("city response", res.data);
    setCity(res.data.data);
  };

  const getAllAreaByCityId = async (id) => {
    const res = await axios.get("/area/getallareabycity/" + id);
    console.log("area response", res.data);
    setArea(res.data.data);
  };

  useEffect(() => {
    getAllState();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: async () => {
      const res = await axios.get("/location/getperlocby/" + id);
      return res.data.data;
    },
  });

  const navigate = useNavigate();

  const submitHandler = async (data) => {
    data.userId = localStorage.getItem("id");
    delete data._id;
    console.log(data);

    const formData = new FormData();
    
    // Append all fields to FormData
    for (const key in data) {
      if (data[key] && key !== 'image') {
        formData.append(key, data[key]);
      }
    }

    // Check if an image is selected {one img}
    // if (data.image[0]) {
    //   formData.append("image", data.image[0]);
    //   console.log("Selected image:", data.image[0]);
    // }

    // Check if an image is selected {multiple img}
    if (data.image && data.image.length > 0) {
      for (let i = 0; i < data.image.length; i++) {
        formData.append("images", data.image[i]); // use "images" to match backend
      }
    }
    

    try {
      const res = await axios.put("/location/updateby2/" + id, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(res.data);
      navigate("/owner/myresto"); // Navigate after successful update
    } catch (error) {
      console.error("Error updating location", error);
    }
  };

  const ValidationSchema = {
    titlevalidator: {
      required: { value: true, message: "title is required" },
    },
    descriptionvalidator: {
      required: { value: true, message: "description is required" },
    },
    selectvalidator: {
      required: { value: true, message: " select is required" },
    },
    timevalidator: {
      required: { value: true, message: "time  is required" },
    },
    // pattern: {
    //     value: /^([0-9]{2}:[0-9]{2} (AM|PM)) - ([0-9]{2}:[0-9]{2} (AM|PM))$/,
    //     message: "Time must be in format HH:MM AM/PM - HH:MM AM/PM",
    //   },
    addressvalidator: {
      required: { value: true, message: "address is required" },
    },
    letlongvalidator: {
      required: { value: true, message: "latitude longitude is required" },
    },
    passwordvalidator: {
      required: { value: true, message: "Password is required" },
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
    <div className="form-container">
      <h1>RESTAURANT SCREEN</h1>
      <form onSubmit={handleSubmit(submitHandler)}>
        <div className="form-group">
          <label>RESTAURANT NAME</label>
          <input
            type="text"
            placeholder="Enter title"
            {...register("title", ValidationSchema.titlevalidator)}
          ></input>
          <span style={{ color: "red", fontSize: "12px" }}>
            {errors.title?.message}
          </span>
        </div>
        <div className="form-group">
          <label>DESCRIPTION</label>
          <input
            type="text"
            placeholder="Enter description"
            {...register("description", ValidationSchema.descriptionvalidator)}
          ></input>
          <span style={{ color: "red", fontSize: "12px" }}>
            {errors.description?.message}
          </span>
        </div>
        <div className="form-group">
          <label>TIMING</label>
          <input
            type="text"
            placeholder="Enter timing"
            {...register("timing", ValidationSchema.timevalidator)}
          ></input>
          <span style={{ color: "red", fontSize: "12px" }}>
            {errors.timing?.message}
          </span>
        </div>
        <div className="form-group">
          <label>FOOD TYPES</label>
          <select {...register("foodType", ValidationSchema.selectvalidator)}>
            <option>SELECT </option>
            <option value="vegetarian">vegetarian</option>
            <option value="non_vegetarian">non_vegetarian</option>
            <option value="vegan">vegan</option>
            <option value="organic">organic</option>
          </select>
          <span style={{ color: "red", fontSize: "12px" }}>
            {errors.foodType?.message}
          </span>
        </div>
        <div className="form-group">
          <label> FOOD CATEGORY</label>
          <select {...register("category", ValidationSchema.selectvalidator)}>
            <option>SELECT </option>
            <option value="fast_food">fast_food</option>
            <option value="cafe">cafe</option>
            <option value="dessert">dessert</option>
            <option value="seafood">seafood</option>
          </select>
          <span style={{ color: "red", fontSize: "12px" }}>
            {errors.category?.message}
          </span>
        </div>
        <div className="form-group">
          <label>CONTACT</label>
          <input
            type="text"
            placeholder="Enter Contact"
            {...register("contactNumber", ValidationSchema.contactvalidator)}
          />
          <span style={{ color: "red", fontSize: "12px" }}>
            {errors.contactNumber?.message}
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
          <label>SELECT STATE</label>
          <select
            {...register("stateId", ValidationSchema.selectvalidator)}
            onChange={(event) => {
              getCityByStateId(event.target.value);
            }}
          >
            <option>SELECT STATE</option>
            {State?.map((state) => {
              return <option value={state._id}>{state.name}</option>;
            })}
          </select>
        </div>
        <div className="form-group">
          <label>SELECT CITY</label>
          <select
            {...register("cityId", ValidationSchema.selectvalidator)}
            onChange={(event) => {
              getAllAreaByCityId(event.target.value);
            }}
          >
            <option>SELECT CITY</option>
            {City?.map((city) => {
              return <option value={city._id}>{city.name}</option>;
            })}
          </select>
        </div>
        <div className="form-group">
          <label>SELECT AREA</label>
          <select {...register("areaId", ValidationSchema.selectvalidator)}>
            <option>SELECT AREA</option>
            {Area?.map((area) => {
              return <option value={area._id}>{area.name}</option>;
            })}
          </select>
        </div>
        <div className="form-group">
          <label>latitude</label>
          <input
            type="number"
            placeholder="Enter latitude"
            {...register("latitude", ValidationSchema.letlongvalidator)}
          ></input>
          <span style={{ color: "red", fontSize: "12px" }}>
            {errors.latitude?.message}
          </span>
        </div>
        <div className="form-group">
          <label>longitude</label>
          <input
            type="number"
            placeholder="Enter longitude"
            {...register("longitude", ValidationSchema.letlongvalidator)}
          ></input>
          <span style={{ color: "red", fontSize: "12px" }}>
            {errors.longitude?.message}
          </span>
        </div>
        <div className="form-group">
          <label>Add Image</label>
          <input type="file" multiple {...register("image")}></input>
        </div>
        <div>
          <input type="submit" className="submit-button"></input>
        </div>
      </form>
    </div>
  );
};
