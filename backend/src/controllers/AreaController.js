const areaModel = require("../models/AreaModel")

const addArea = async (req,res) => {
    try{
        const saveArea = await areaModel.create(req.body);
        res.status(201).json({
            message:"added area successfully",
            data:saveArea
        })
    }catch(err){
        res.status(500).json({
            message:err
        })
    }
}

const getAllArea = async (req,res) => {
    try{
        const fetchArea = await areaModel.find().populate("stateId").populate("cityId")
        res.status(200).json({
            message:"fetch all added area successfully",
            data:fetchArea
        })
    }catch(err){
        res.status(500).json({
            message:err
        })
    }
}
const getAllAreaByCityId = async (req,res) => {
    try{
        const findAreaByCityId = await areaModel.find({cityId:req.params.cityId})
        res.status(200).json({
            message:"fetch all area by city id",
            data:findAreaByCityId
        })
    }catch(err){
        res.status(500).json({
            message:err
        })
    }
}

module.exports = {
    getAllArea,addArea,getAllAreaByCityId
}