import express from "express";
import { orders } from "../models/order.js";

export const router3 = express.Router()

router3.post('/orderData', async (req, res) => {

    const { order_data, email, order_date } = req.body

    let data = order_data 
    await data.splice(0, 0, { order_date })

    let id = await orders.findOne({ email })
    // console.log(id)

    if (!id) {
        try {

            await orders.create({
                email,
                order_data: [data]
            }).then(() => res.json({
                success: true,
                message: 'user data created'
            }))

        } catch (error) {
            console.log(error.message)
            res.send('Server error in creating user data')
        }
    }
    else {
        try {

            await orders.findOneAndUpdate({ email }, {
                $push: { order_data: data }
            }).then(() => {
                res.send({
                    success: true,
                    message: 'user data updated'
                })
            })

        } catch (error) {
            console.log(error.message)
            res.send('Server error in updating user data')
        }
    }

})


router3.post('/myOrders', async (req, res) => {
    try {

        let data = await orders.findOne({ email: req.body.email })

        if(data){
            res.json({ orderData: data, success:true })
        }
        else{
            res.json({success:false})
        }

    } catch (error) {
        console.log(error.message)
        res.send('Server error in finding user data')
    }
})
