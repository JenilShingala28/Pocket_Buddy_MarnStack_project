import axios from 'axios';
import React from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Bounce, toast, ToastContainer } from 'react-toastify';

export const OwnerSignup = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
    
  const navigate = useNavigate();

  const submitHandler = async (data) => {

    console.log(data)
    //const res = await axios.post("http://localhost:3000/user")

  //before sending data.. role bind
  data.roleId = "67c55fa245c6c957fcd10125"


  const res = await axios.post("/osignup",data)
   console.log(res) //axiosobjec
   console.log(res.data) //api response...
   
 
  //tost..
  //"100" == 100 -->true
  //"100" === 100 -->false
  // if(res.status===201){
  //   //user added..
  //   //naviget
  // }
  
  if (res.status === 201) {
      // alert("user deleted..");
      toast.success('User record added !!', {
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
      navigate("/ologin")
     
  }else {
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
  } 
  // else{
  //   //user not added..
  //   //login..
  // }

    
  };

  const ValidationSchema = {
    namevalidator: {
      required: { value: true, message: "Firstname is required" }
    },
    Lastnamevalidator: {
      required: { value: true, message: "Lastname is required" }
    },
    emailvalidator: {
      required: { value: true, message: "Email is required" }
    },
    passwordvalidator: {
      required: { value: true, message: "Password is required" }
    },
    contactvalidator:{
      required: { value: true, message: "Contact is required" },
      pattern: { value: /^[6-9]{1}[0-9]{9}$/, message: "Contact is not valid..." }
  }
}


 

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
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: "linear-gradient(to right,rgb(132, 59, 93),rgb(168, 84, 84))"
    }}>
      <div style={{
        background: 'white',
        padding: '30px',
        borderRadius: '10px',
        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
        width: '80%',
        maxWidth: '400px',
        textAlign: 'center',
        marginTop:"10px",
        marginBottom:"10px"
    
      }}>

        <h1 style={{ marginBottom: '15px', color: 'black' }}> Owner Sign Up</h1>
        <form onSubmit={handleSubmit(submitHandler)}>
          {/* First Name */}


          <div style={{ marginBottom: '15px', textAlign: 'left' }}>
            <label style={{  marginBottom: '10px' }}>First Name:</label>
            <input 
              type="text"
              placeholder="Enter First Name"{...register("firstName", ValidationSchema.namevalidator)}
              style={{
                width: '100%',
                padding: '10px',
                fontSize: '14px',
                border: '1px solid #ccc',
                borderRadius: '5px'
              }}
            />
            <span style={{ color: 'red', fontSize: '12px' }}>
              {errors.firstName?.message}
            </span>
          </div>



          {/* Last Name */}
          <div style={{ marginBottom: '15px', textAlign: 'left' }}>
            <label style={{  marginBottom: '5px' }}>Last Name:</label>
            <input 
              type="text"
              placeholder="Enter Last Name"
              {...register("lastName", ValidationSchema.Lastnamevalidator)}
              style={{
                width: '100%',
                padding: '10px',
                fontSize: '14px',
                border: '1px solid #ccc',
                borderRadius: '5px'
              }}
            />
            <span style={{ color: 'red', fontSize: '12px' }}>
              {errors.lastName?.message}
            </span>
          </div>


          {/* Email */}
          <div style={{ marginBottom: '15px', textAlign: 'left' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Email:</label>
            <input 
              type="email"
              placeholder="Enter Email"
              {...register("email", ValidationSchema.emailvalidator)}
              style={{
                width: '100%',
                padding: '10px',
                fontSize: '14px',
                border: '1px solid #ccc',
                borderRadius: '5px'
              }}
            />
            <span style={{ color: 'red', fontSize: '12px' }}>
              {errors.email?.message}
            </span>
          </div>

          {/* Password */}
          <div style={{ marginBottom: '15px', textAlign: 'left' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Password:</label>
            <input 
              type="password"
              placeholder="Enter Password"
              {...register("password", ValidationSchema.passwordvalidator)}
              style={{
                width: '100%',
                padding: '10px',
                fontSize: '14px',
                border: '1px solid #ccc',
                borderRadius: '5px'
              }}
            />
            <span style={{ color: 'red', fontSize: '12px' }}>
              {errors.password?.message}
            </span>
          </div>

          {/* Submit Button */}
          <div >
            <input 
              type="submit"
              value="Sign Up"
              style={{
                width: '100%',
                padding: '12px',
                fontSize: '16px',
                backgroundColor: '#667eea',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                transition: 'background 0.3s ease'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = 'black'}
              onMouseOut={(e) => e.target.style.backgroundColor = 'blue'}
            />
          </div>
        </form>
        <div className="text-center mt-3">
        <p>
          Already have an account? <a href="/ologin" className="text-primary">Login here</a>
        </p>
      </div>
      </div>
    </div>
  </div>  
  );
}
