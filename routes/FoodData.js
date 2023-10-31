import express from "express";
import { food_category,food_item } from "../models/User.js";

export const router2 = express.Router()

router2.post('/foodData',async(req,res)=>{
    try {
        let foodItemsData = await food_item.find({})
        let foodCategoryData = await food_category.find({})

        res.send([foodItemsData,foodCategoryData])

    } catch (error) {
        console.log(error)
        res.send('server error')
    }
})