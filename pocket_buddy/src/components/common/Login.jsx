import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Bounce, toast, ToastContainer } from "react-toastify";
import "../../assets/login.css";

export const Login = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  console.log(errors);

  const SubmitHandler = async (data) => {
    // data.roleId = "67bd39d90d07b9633d60535d"
    try {
      const res = await axios.post("/ulogin", data);
      console.log(res.data);
      if (res.status === 200) {
        toast.success("User login successfully !!", {
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
        //alert("Login Success")
        // console.log(res.data.data._id)
        // console.log(res.data.data.roleId.name)

        localStorage.setItem("id", res.data.data._id);
        localStorage.setItem("role", res.data.data.roleId.name);

        setTimeout(() => {
          if (res.data.data.roleId.name === "USER") {
            navigate("/user");
          }else if (res.data.data.roleId.name === "OWNER") {
            navigate("/owner");
          }
           else if (res.data.data.roleId.name === "ADMIN") {
             navigate("/admin");
           }
        }, 1500);
      } else {
        toast.error("login went wrong!", {
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
        //alert("Login Failed")
      }
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
      console.error("error:", error);
    }
  };

  
  
  const ValidationSchema = {
    emailvalidator: {
      required: {
        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        message: "username is required",
      },
    },

    passwordvalidator: {
      required: {
        value: true,
        message: "password is required",
      },
    },
  };

  // const handleForgotPassword = () => {
  //   alert("Redirecting to Forgot Password page...");
  //   // Here, you can navigate to another page using React Router.
  // };

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

      <div
        style={{
          display: "flex",
          justifyContent: "center", // Centers horizontally
          alignItems: "center", // Aligns items to the top
          height: "100vh",
          // padding: "5vh",                // Adds space from the top
          background: "rgb(239, 182, 200)",
        }}
      >
        <div className="login-container">
          <h1>Login</h1>
          <form onSubmit={handleSubmit(SubmitHandler)}>
            <div className="login-group">
              <label>EMAIL :</label>
              <input
                type="text"
                placeholder="email"
                {...register("email", ValidationSchema.emailvalidator)}
              ></input>
              <span style={{ color: "red" }}>{errors.email?.message}</span>
            </div>

            <div className="login-group">
              <label>PASSWORD :</label>
              <input
                type="password"
                placeholder="Password"
                {...register("password", ValidationSchema.passwordvalidator)}
              ></input>
              <span style={{ color: "red" }}>{errors.password?.message}</span>
            </div>

            <div>
              <input type="submit" value="Login" className="login-button" />
            </div>
            <div className="forgot-password-container">
              <Link to="/forgetpassword" className="forgot-password-link">
                Forgot Password?
              </Link>
            </div>
          </form>

          <div className="text-center mt-3">
            <p>
              Don't have an account?{" "}
              <Link to="/signup" className="text-primary">
                Sign up here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
