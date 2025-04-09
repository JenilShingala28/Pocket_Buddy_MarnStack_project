const RoleModel = require("../models/RoleModel")

const getAllController = async (req,res) => {

    const roles = await RoleModel.find()

    res.json({
        message:"role fetch successfully",
        data: roles
    })
}
//post
const addRole = async(req,res) => {
    //req.body,req.params,req.headers,req.query
  //console.log("request body....", req.body);
  //insert into roles () values()
  //database...
    const postRole = await RoleModel.create(req.body)

    res.json({
        message:"role create successfully",
        data: postRole
    })
}
//delete
const deleteRole =async(req,res) => {
      //delete from roles where id =?
    //req.params.id
//    console.log(req.params.id) //prams object...
const deleteRole = await RoleModel.findByIdAndDelete(req.params.id)

    res.json({
        message:"role delete by id  successfully",
        data: deleteRole
    })

}
//grt by id
const getRoleId = async(req,res)=>{
    //req.params
    const foundRole =await RoleModel.findById(req.params.id)
    
    res.json({
        message:"role found by id  successfully",
        data: foundRole
    })
}
 module.exports = {
    getAllController,addRole,deleteRole,getRoleId
 }