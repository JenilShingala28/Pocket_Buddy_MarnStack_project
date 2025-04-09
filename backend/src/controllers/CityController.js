const cityModel = require("../models/CityModel");

const addCity = async (req,res) => {
    try{
        const saveCity = await cityModel.create(req.body);
        res.status(201).json({
            message:"added city successfully",
            data:saveCity
        })
    }catch(err){
        res.status(500).json({
            message:err
        })
    }
}

const getAllCity = async (req,res) => {
    try {
        const fetchCity = await cityModel.find().populate("stateId");
        res.status(200).json({
            message:"fetch all added city successfully",
            data:fetchCity
        })
    }catch(err){
        res.status(500).json({
            message:err
        })
    }
}

const getCityByStateId = async (req,res) => {
    try{
        const fetchCityByState = await cityModel.find({stateId: req.params.stateId})
        res.status(200).json({
            message:"fetch all city by statId ",
            data:fetchCityByState
        })
    }catch(err){
        res.status(500).json({
            message:err
        })
    }
}

module.exports = {
    addCity,getAllCity,getCityByStateId
}