import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import "../../assets/resetforget.css";
import { Bounce, toast, ToastContainer } from "react-toastify";

export const ResetPassword = () => {
  const token = useParams().token;

  const navigate = useNavigate();

  const { register, handleSubmit } = useForm();

  const submitHandler = async (data) => {
    //restPassword api
    try {
      const obj = {
        token: token,
        password: data.password,
      };

      const res = await axios.post("/resetpassword", obj);
      console.log("Response reset:", res.data);

      toast.success("Password reset successful! You can now log in!", {
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

      setTimeout(() => {
        navigate("/login");
      }, 4000);
    } catch (err) {
      toast.error("resetting password Error", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
      console.error("resetting password Error:", err.message);
    }
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
      <div className="forget">
        <div className="form-container">
          <h1>RESET PASSWORD COMPONENT</h1>

          <form onSubmit={handleSubmit(submitHandler)}>
            <div className="form-group">
              <label>NEW PASSWORD</label>

              <input type="text" {...register("password")}></input>
            </div>

            <div>
              <input type="submit" className="submit-button" value="Reset"></input>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
