
import axios from 'axios';
import React from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Bounce, toast, ToastContainer } from 'react-toastify';

export const OwnerLogin = () => {
 

  const navigate = useNavigate();

  const { register, handleSubmit, formState:{errors} } = useForm();
  console.log(errors)

   const SubmitHandler = async(data)=>{
    // data.roleId = "67bd39d90d07b9633d60535d"

    const res = await axios.post("/ologin", data)
    console.log(res.data)
    if(res.status === 200){
      toast.success('User record added !!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: 1,
        theme: "dark",
        transition: Bounce,
    });
      //alert("Login Success") 
      // console.log(res.data.data._id)
      // console.log(res.data.data.roleId.name)

      localStorage.setItem("id",res.data.data._id)
      localStorage.setItem("role",res.data.data.roleId.name)

        if(res.data.data.roleId.name === "USER"){
          navigate("/user")
        }
    }
    else{
      toast.error('Something went wrong!', {
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
      //alert("Login Failed")
    }
     

    }

    const ValidationSchema ={
     emailvalidator:{
      required:{
        value:true,
        message:"username is required"
      }
     },

     passwordvalidator:{
      required:{
        value:true,
        message:"password is required"
      },

    }
  }

  const handleForgotPassword = () => {
    alert("Redirecting to Forgot Password page...");
    // Here, you can navigate to another page using React Router.
  };


  
  return (

    <div style={{textAlign:"center"}}>

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


    <div style={{
      display: "flex",
      justifyContent: "center",        // Centers horizontally
      alignItems: "center",          // Aligns items to the top
      height: "100vh",
      // padding: "5vh",                // Adds space from the top
      background: "linear-gradient(to right,rgb(144, 43, 184),rgb(131, 49, 112))"
    }}>
      <div style={{
        background: "white",
        padding: "30px",
        borderRadius: "20px",
        boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)",
        width: "40%",  
        minWidth: "350px",
        textAlign: "center"
      }}>
  
        <h1 style={{marginBottom: "20px"}}>Owner Login</h1>
        <form onSubmit={handleSubmit(SubmitHandler)}>

        <div style={{ marginBottom: '15px', textAlign: 'left' }}>
          <label style={{marginBottom: '10px'}}>email :</label>
          <input type='text' placeholder='email' {...register("email", ValidationSchema.emailvalidator)} 
            style={{
              width: "100%",
              padding: "10px",
              fontSize: "14px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              
            }}></input>
          <span style={{color:"red"}}>
          {errors.email?.message}
          </span>
          </div>

          <div style={{ marginBottom: '15px', textAlign: 'left' }}>
          <label style={{marginBottom: '10px'}}>Password :</label>
          <input type='password' placeholder='Password' {...register("password", ValidationSchema.passwordvalidator)}
            style={{
              width: "100%",
              padding: "10px",
              fontSize: "14px",
              border: "1px solid #ccc",
              borderRadius: "5px"
            }}
          />
          <span style={{color:"red"}}>
          {errors.password?.message}
          </span>
          </div>

          <div>
          <input type='submit' value='Login'
            style={{
              width: "25%",
              padding: "6px",
              fontSize: "16px",
              backgroundColor: "#667eea",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              transition: "0.3s",
              fontWeight: "bold"
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = 'black'}
            onMouseOut={(e) => e.target.style.backgroundColor = 'blue'}
          />
          </div>
          <div style={{ marginBottom: "12px" }}>
          <a href="#" onClick={handleForgotPassword} 
            style={{
              fontSize: "14px",
              color: "#667eea",
              textDecoration: "none",
              cursor: "pointer"
            }}
            onMouseOver={(e) => e.target.style.textDecoration = "underline"}
            onMouseOut={(e) => e.target.style.textDecoration = "none"}
          >
            Forgot Password?
          </a>
        </div>
        </form>

         <div className="text-center mt-3">
          <p>
            Don't have an account? <a href="/osignup" className="text-primary">Sign up here</a>
          </p>
         </div>
    </div>
    </div>
    </div>
  )
  
  
}
