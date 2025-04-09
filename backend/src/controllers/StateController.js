const StateModel = require("../models/StateModel");

const addState = async (req,res) => {
    try{
        const saveState = await StateModel.create(req.body)
        res.status(201).json({
            message:"state added successfully",
            data:saveState
        })

    }catch(err){
        res.status(500).json({
            message:err
        })

    }
}

const getAllState = async (req,res) => {
    try{
        const fetchState = await StateModel.find()
        res.status(200).json({
            message:"all added state fetch successfully",
            data:fetchState
        })

    }catch(err){
        res.status(500).json({
            message:err
        })

    }
}


module.exports={
    addState,getAllState

}