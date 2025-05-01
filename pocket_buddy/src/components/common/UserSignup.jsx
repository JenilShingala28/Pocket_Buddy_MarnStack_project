import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Bounce, toast, ToastContainer } from "react-toastify";
import "../../assets/signup.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export const UserSignup = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Watch the password field to validate confirm password
  const password = watch("password");

  const submitHandler = async (data) => {
    console.log(data);
    //const res = await axios.post("http://localhost:3000/user")

    //before sending data.. role bind
    // data.roleId = "67c55fa245c6c957fcd10125";

    try {
      // const res = await axios.post("/signup",data)
      const res = await axios.post("/signup", data);
      console.log(res); //axiosobjec
      console.log(res.data); //api response...

      //tost..
      //"100" == 100 -->true
      //"100" === 100 -->false
      // if(res.status===201){
      //   //user added..
      //   //naviget
      // }

      if (res.status === 201) {
        // alert("user deleted..");
        toast.success("User signup successfully !!", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } else {
        toast.error("Already Signup!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
      }
      // else{
      //   //user not added..
      //   //login..
      // }
    } catch (error) {
      toast.error("Something went wrong!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
      console.error("error", error);
    }
  };

  const ValidationSchema = {
    namevalidator: {
      required: { value: true, message: "Firstname is required" },
      minLength: {
        value: 3,
        message: "At least 3 characters",
      },
    },
    Lastnamevalidator: {
      required: { value: true, message: "Lastname is required" },
      minLength: {
        value: 3,
        message: "At least 3 characters",
      },
    },
    emailvalidator: {
      required: { value: true, message: "Email is required" },
      pattern: {
        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        message: "Invalid Email Address",
      },
    },
    passwordvalidator: {
      required: { value: true, message: "Password is required" },
      minLength: {
        value: 6,
        message: "At least 6 characters",
      },
    },
    selectvalidator: {
      required: { value: true, message: " select is required" },
    },
  };

  return (
    <div style={{ textAlign: "center" }}>
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

      <div className="center-container">
        <div className="sign-container">
          <h1 style={{ marginBottom: "15px", color: "black" }}> Sign Up</h1>
          <form onSubmit={handleSubmit(submitHandler)}>
            {/* select role Name */}
            <div className="sign-group">
              <label>Select Role Name:</label>
              <select
                {...register("roleId", ValidationSchema.selectvalidator)}
              >
                <option>SELECT </option>
                <option value="67c55fa245c6c957fcd10125">USER</option>
                <option value="67c55fe145c6c957fcd10129">OWNER</option>
                
              </select>
              <span style={{ color: "red", fontSize: "12px" }}>
                {errors.roleId?.message}
              </span>
            </div>

            {/* First Name */}

            <div className="sign-group">
              <label>First Name:</label>
              <input
                type="text"
                placeholder="Enter First Name"
                {...register("firstName", ValidationSchema.namevalidator)}
              />
              <span style={{ color: "red", fontSize: "12px" }}>
                {errors.firstName?.message}
              </span>
            </div>

            {/* Last Name */}
            <div className="sign-group">
              <label>Last Name:</label>
              <input
                type="text"
                placeholder="Enter Last Name"
                {...register("lastName", ValidationSchema.Lastnamevalidator)}
              />
              <span style={{ color: "red", fontSize: "12px" }}>
                {errors.lastName?.message}
              </span>
            </div>

            {/* Email */}
            <div className="sign-group">
              <label>Email:</label>
              <input
                type="email"
                placeholder="Enter Email"
                {...register("email", ValidationSchema.emailvalidator)}
              />
              <span style={{ color: "red", fontSize: "12px" }}>
                {errors.email?.message}
              </span>
            </div>

            {/* Password */}
            <div className="sign-group">
              <label>Password:</label>
              <div className="password-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  {...register("password", ValidationSchema.passwordvalidator)}
                  className="password-input"
                />
                <span
                  className="eye-icon"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              <span style={{ color: "red", fontSize: "12px" }}>
                {errors.password?.message}
              </span>
            </div>

            <div className="sign-group">
              <label>Confirm Password</label>
              <div className="password-wrapper">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  {...register("plainPassword", {
                    required: "Confirm Password is required",
                    validate: (value) =>
                      value === password || "Passwords do not match",
                  })}
                  className="password-input"
                />
                <span
                  className="eye-icon"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              <span style={{ color: "red", fontSize: "12px" }}>
                {errors.plainPassword?.message}
              </span>
            </div>

            {/* Submit Button */}
            <div>
              <input type="submit" value="Sign Up" className="sign-button" />
            </div>
          </form>
          <div className="text-center mt-3">
            <p>
              Already have an account?{" "}
              <Link to="/login" className="text-primary">
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
