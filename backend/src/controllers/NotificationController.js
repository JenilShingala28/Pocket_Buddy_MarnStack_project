const notificationModel = require("../models/NotificationModel")

const addNotification = async (req,res) => {
    try{
        const saveNotification = await notificationModel.create(req.body);
        res.status(201).json({
            message:"added Notification successfully",
            data:saveNotification,
        })
    }catch(err){
        res.status(500).json({
            message:err,
        })
    }
}

const getAllNotification = async (req,res) => {
    try{
        const fetchNotification = await notificationModel.find().populate("userId")
        res.status(201).json({
            message:"fetch all Notification successfully",
            data:fetchNotification,
        })
    }catch(err){
        res.status(500).json({
            message:err,
        })
    }
}


const deleteNotificationById = async (req,res) => {
    try{
        const deleteById = await notificationModel.findByIdAndDelete(req.params.id)
        res.status(201).json({
            message:"delete Notification by selected id successfully",
            data:deleteById,
        })
    }catch(err){
        res.status(500).json({
            message:err,
        })
    }
}

module.exports = {
    getAllNotification,addNotification,deleteNotificationById
}