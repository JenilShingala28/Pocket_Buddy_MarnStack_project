const { json } = require("express");
const UserModel = require("../models/UserModel");
const bcrypt = require("bcrypt");

const multer = require("multer");
const path = require("path");
const cloudinaryUtil = require("../utils/CloudinaryUtil");

const mailUtil = require("../utils/MailUtil");
const jwt = require("jsonwebtoken");
const secret = "secret";

//storage
const storage = multer.diskStorage({
  destination: "./upload",
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

//multer object....
const upload = multer({
  storage: storage,
  //fileFilter:
}).single("image");

const ulogin = async (req, res) => {
  //req.body email and password: password
  //password -->plain ===  db -->encrypted
  //bcrypt  --> plain == enc --> match : true \\ false

  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;

  //select * from users where email =? and password = ?
  //userModel.find({email:email,password:password})
  //email --> object -->abc --{password:hashedPassword}
  //normal password compare --> hashedPassword

  //const foundUserFromEmail = await userModel.findOne({email:req.body.email})
  const foundUserFromEmail = await UserModel.findOne({ email: email }).populate(
    "roleId"
  );
  console.log(foundUserFromEmail);

  if (foundUserFromEmail != null) {
    //const isMatch = bcrypt.compareSync(req.body.password,foundUserFromEmail.password)
    const isMatch = bcrypt.compareSync(
      password,
      foundUserFromEmail.password,
      confirmPassword,
      foundUserFromEmail.confirmPassword
    );

    if (isMatch === true) {
      res.status(200).json({
        message: "login successfully",
        data: foundUserFromEmail,
      });
    } else {
      res.status(404).json({
        message: "password not found",
      });
    }
  } else {
    res.status(404).json({
      message: "email not found",
    });
  }
};

// authorization
// const loginuserWithToken = async (req, res) => {
//   const { email, password } = req.body;

//   const foundUserFromEmail = await UserModel.findOne({ email: email });

//   if (foundUserFromEmail) {
//     const isMatch = bcrypt.compareSync(password, foundUserFromEmail.password);

//     if (isMatch) {
//       //token...

//       const token = jwt.sign(foundUserFromEmail.toObject(), secret);

//       //const token = jwt.sign({id:foundUserFromEmail._id},secret)

//       res.status(200).json({
//         message: "user logged in..",

//         token: token,
//       });
//     } else {
//       res.status(420).json({
//         message: "invalid cred...",
//       });
//     }
//   } else {
//     res.status(404).json({
//       message: "user not found..",
//     });
//   }
// };

const signup = async (req, res) => {
  try {

      // Check if a user already exists with the same email or contact
      const existingUser = await UserModel.findOne({
        email: req.body.email 
      });
  
      if (existingUser) {
        return res.status(400).json({
          statusCode: 400,
          message: "User with this email already exists.",
        });
      }

    const salt = bcrypt.genSaltSync(10);
    console.log("🚀 ~ signup ~ salt:", salt);
    const hashedpassword = bcrypt.hashSync(req.body.password, salt);
    //req.body.plainPassword = req.body.password;
    req.body.password = hashedpassword;

    const createUser = await UserModel.create(req.body);

    await mailUtil.sendingMail(
      createUser.email,
      "welcome to pocket buddy app",
      "welcome to our restaurants "
    );
     // Return success
     const { password, ...userWithoutPassword } = createUser._doc;
    res.status(201).json({
      statusCode: 201,
      message: "User created successfully.",
      data: userWithoutPassword,
    });
  } catch (err) {
    console.log("Getting error while user signup :", err);
    res.status(500).json({
      message: "something went wrong.",
      statusCode: 500,
    });
  }
};

const ologin = async (req, res) => {
  //req.body email and password: password
  //password -->plain ===  db -->encrypted
  //bcrypt  --> plain == enc --> match : true \\ false

  const email = req.body.email;
  const password = req.body.password;

  //select * from users where email =? and password = ?
  //userModel.find({email:email,password:password})
  //email --> object -->abc --{password:hashedPassword}
  //normal password compare --> hashedPassword

  //const foundUserFromEmail = await userModel.findOne({email:req.body.email})
  const foundUserFromEmail = await UserModel.findOne({ email: email }).populate(
    "roleId"
  );
  console.log(foundUserFromEmail);

  if (foundUserFromEmail != null) {
    //const isMatch = bcrypt.compareSync(req.body.password,foundUserFromEmail.password)
    const isMatch = bcrypt.compareSync(password, foundUserFromEmail.password);

    if (isMatch === true) {
      res.status(200).json({
        message: "login successfully",
        data: foundUserFromEmail,
      });
    } else {
      res.status(404).json({
        message: "password not found",
      });
    }
  } else {
    res.status(404).json({
      message: "email not found",
    });
  }
};

const osignup = async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hashedpassword = bcrypt.hashSync(req.body.password, salt);
    req.body.password = hashedpassword;

    const createUser = await UserModel.create(req.body);
    res.status(201).json({
      message: "user created..",
      data: createUser,
    });
  } catch (err) {
    res.status(500).json({
      message: "error",
      data: err,
    });
  }
};

const getUser = async (req, res) => {
  // provide role data all fields --> in userdata
  try {
    const addUser = await UserModel.find().populate("roleId");
    // provide particular fields in userdata = + = all fields in role data
    //const addUser = await UserModel.find().populate("roleId").select("lastName")
    //provide  particular fields  -> user data
    //const addUser = await UserModel.find().select("firstName")  //lastName //age //status
    res.status(200).json({
      message: " add user successfully",
      data: addUser,
    });
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
};
const postUser1 = async (req, res) => {
  try {
    const addUser = await UserModel.create(req.body);
    res.status(201).json({
      message: "user created..",
      data: addUser,
    });
  } catch (err) {
    res.status(500).json({
      message: "error",
      data: err,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const deleteUserData = await UserModel.findByIdAndDelete(req.params.id);
    res.status(201).json({
      message: " delete user by id successfully",
      data: deleteUserData,
    });
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
};

const getUserById = async (req, res) => {
  // get data by particular id
  // const foundUserData = await UserModel.findById(req.params.id)
  // get data by particular id and show particular fields

  try {
    const foundUserData = await UserModel.findById(req.params.id); //.select("age"); //lastName //firstName //status
    if (!foundUserData) {
      return res.status(404).json({ message: "User Data not found!" });
    } else {
      res.status(201).json({
        message: " found user by id successfully",
        data: foundUserData,
      });
    }
  } catch (err) {
    {
      res.status(500).json({
        message: err,
      });
    }
  }
};

const addWithUserFile = async (req, res) => {
  try {
    upload(req, res, async (err) => {
      if (err) {
        console.error("Multer error:", err);
        return res.status(500).json({ message: err.message });
      }

      console.log("Uploaded File:", req.file); // Debugging

      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      // Upload to Cloudinary
      const cloudinaryResponse = await cloudinaryUtil.uploadFileToCloudinary(
        req.file
      );
      console.log("Cloudinary Response:", cloudinaryResponse);

      // Store URL in database
      req.body.imageURL = cloudinaryResponse.secure_url;
      const savedImage = await UserModel.create(req.body);
      console.log("Saved Data:", savedImage);

      res.status(200).json({
        message: "file saved successfully",
        data: savedImage,
      });
    });
  } catch (error) {
    console.error("Error in addFile:", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const getAllUserByUserId = async (req, res) => {
  try {
    const userProfile = await UserModel.find({
      userId: req.params.userId,
    }).populate("userId");
    if (userProfile.length === 0) {
      res.status(404).json({ message: "No user found" });
    } else {
      res.status(200).json({
        message: "user found successfully",
        data: userProfile,
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const updateUserProfileById = async (req, res) => {
  try {
    // Handle the file upload first
    upload(req, res, async (err) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          message: err.message,
        });
      }

      // Check if an image is uploaded
      if (req.file) {
        // If a new image is uploaded, upload it to Cloudinary
        const cloudinaryResponse = await cloudinaryUtil.uploadFileToCloudinary(
          req.file
        );
        console.log("Cloudinary Response:", cloudinaryResponse);

        // Store the image URL in the request body
        req.body.imageURL = cloudinaryResponse.secure_url;
      }

      // Update the location with the new data, including the new image URL if uploaded
      const updateData = await UserModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

      if (!updateData) {
        return res.status(404).json({ message: "profile not found!" });
      } else {
        res.status(200).json({
          message: "profile updated successfully",
          data: updateData,
        });
      }
    });
  } catch (err) {
    console.error("Error in updating location:", err);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// const updateOwnerProfileById = async (req, res) => {
//   try {
//     const updateData = await UserModel.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     );

//     if (!updateData) {
//       return res.status(404).json({ message: "User Profile not found!" });
//     } else {
//       res.status(200).json({
//         message: "User Profile update successfully",
//         data: updateData,
//       });
//     }
//   } catch (err) {
//     res.status(500).json({
//       message: err.message,
//     });
//   }
// };
const updateOwnerProfileById = async (req, res) => {
  try {
    // Handle the file upload first
    upload(req, res, async (err) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          message: err.message,
        });
      }

      // Check if an image is uploaded
      if (req.file) {
        // If a new image is uploaded, upload it to Cloudinary
        const cloudinaryResponse = await cloudinaryUtil.uploadFileToCloudinary(
          req.file
        );
        console.log("Cloudinary Response:", cloudinaryResponse);

        // Store the image URL in the request body
        req.body.imageURL = cloudinaryResponse.secure_url;
      }

      // Update the location with the new data, including the new image URL if uploaded
      const updateData = await UserModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

      if (!updateData) {
        return res.status(404).json({ message: "profile not found!" });
      } else {
        res.status(200).json({
          message: "profile updated successfully",
          data: updateData,
        });
      }
    });
  } catch (err) {
    console.error("Error in updating location:", err);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};


const updateAdminProfileById = async (req, res) => {
  try {
    // Handle the file upload first
    upload(req, res, async (err) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          message: err.message,
        });
      }

      // Check if an image is uploaded
      if (req.file) {
        // If a new image is uploaded, upload it to Cloudinary
        const cloudinaryResponse = await cloudinaryUtil.uploadFileToCloudinary(
          req.file
        );
        console.log("Cloudinary Response:", cloudinaryResponse);

        // Store the image URL in the request body
        req.body.imageURL = cloudinaryResponse.secure_url;
      }

      // Update the location with the new data, including the new image URL if uploaded
      const updateData = await UserModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

      if (!updateData) {
        return res.status(404).json({ message: "profile not found!" });
      } else {
        res.status(200).json({
          message: "profile updated successfully",
          data: updateData,
        });
      }
    });
  } catch (err) {
    console.error("Error in updating location:", err);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const forgetPassword = async (req, res) => {
  const email = req.body.email;
  const foundUser = await UserModel.findOne({ email: email });

  if (foundUser) {
    const token = jwt.sign(foundUser.toObject(), secret, { expiresIn: "1h" });
    console.log("Generated Token:", token);

    const url = `http://localhost:5173/resetpassword/${token}`;
    const mailContent = `<html>
    <a href ="${url}">reset password</a>
    </html>`;

    await mailUtil.sendingMail(foundUser.email, "reset password", mailContent);
    res.json({
      message: "reset password link sent to mail.",
    });
  } else {
    res.json({
      message: "user not found register first..",
    });
  }
};

const resetpassword = async (req, res) => {
  const token = req.body.token;
  const newPassword = req.body.password;

  const userFromToken = jwt.verify(token, secret);

  const salt = bcrypt.genSaltSync(10);
  const hashedpassword = bcrypt.hashSync(newPassword, salt);

  const updatedUser = await UserModel.findByIdAndUpdate(userFromToken._id, {
    password: hashedpassword,
  });
  res.json({
    message: "password updated successfully..",
    data: updatedUser,
  });
};

const deleteUserById = async (req, res) => {
  try {
    const deletedUser = await UserModel.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      message: "User deleted successfully",
      data: deletedUser,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

const loginUserWithToken = async (req, res) => {
  const { email, password } = req.body;

  const foundUserFromEmail = await UserModel.findOne({ email: email }).populate("roleId");

  if (foundUserFromEmail) {
    const isMatch = bcrypt.compareSync(password, foundUserFromEmail.password);

    if (isMatch) {
      //token...
      //all object to convert token 
      //const token = jwt.sign(foundUserFromEmail.toObject(), secret);
      
      //only id and email to convert token
      const token = jwt.sign({ id: foundUserFromEmail._id, 
        email: foundUserFromEmail.email,
        roleId: foundUserFromEmail.roleId }, secret)

      //const token = jwt.sign({id:foundUserFromEmail._id},secret)

      res.status(200).json({
        message: "user loggedin..",

        token: token,
        data: {
          _id: foundUserFromEmail._id,
          email: foundUserFromEmail.email,
          roleId: foundUserFromEmail.roleId,  // this includes the `.name` if populated
        },
      });
    } else {
      res.status(420).json({
        message: "invalid cred...",
      });
    }
  } else {
    res.status(404).json({
      message: "user not found..",
    });
  }
};
module.exports = {
  getUser,
  deleteUser,
  postUser1,
  signup,
  osignup,
  ulogin,
  ologin,
  addWithUserFile,
  getAllUserByUserId,
  getUserById,
  updateUserProfileById,
  updateAdminProfileById,
  updateOwnerProfileById,
  deleteUserById,

  forgetPassword,
  resetpassword,

  loginUserWithToken,
};
