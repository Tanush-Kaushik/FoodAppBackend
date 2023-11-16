import mongoose from "mongoose";


const orderSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    order_data:{
        type:Array,
        required:true
    }
})
export const orders = mongoose.model('orders',orderSchema)