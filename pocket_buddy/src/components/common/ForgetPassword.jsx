import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "../../assets/resetforget.css";
import { Bounce, toast, ToastContainer } from "react-toastify";


export const ForgetPassword = () => {
  const [email, setEmail] = useState("");

  const { register, handleSubmit } = useForm();

  const submitHandler = async (data) => {
    try {
      const res = await axios.post("/forgetpassword", { email });

      toast.success("Password reset link sent to your email!", {
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
    } catch {
      toast.error("Failed to send reset password link! Please try again.", {
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
    }
  };
  return (
    <div className="forget">
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
      <div className="form-container">
        <h1>FORGET COMPONENT</h1>
        <form onSubmit={handleSubmit(submitHandler)}>
          <div className="form-group">
            <label>Emil</label>

            <input
              type="text"
              {...register("email")}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            ></input>
          </div>

          <div>
            <input type="submit" className="submit-button" value="Forget"></input>
          </div>
        </form>
      </div>
    </div>
  );
};
