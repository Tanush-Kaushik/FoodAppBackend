import express from "express";
import { orders } from "../models/order.js";
import nodemailer from 'nodemailer';

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


    //

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASS
        }
    });
  
    var mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: 'FOODY',
        text: 'FOODY' , 
        html: '<h3>Thanks for ordering from our service. Be sure to check out other tasty options!</h3></br><h4>https://foodappfrontend.onrender.com/</h4>'
    };
  
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

    //

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
