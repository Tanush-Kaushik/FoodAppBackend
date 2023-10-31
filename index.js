import express from 'express'
import {mongoDB} from './db.js'
import { router } from './routes/User.js'
import { router2 } from './routes/FoodData.js'
import { router3 } from './routes/OrderData.js'
import { config } from 'dotenv';


config({path:'./config.env'}) 
mongoDB() 
const app = express()
const port = process.env.PORT


app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','http://localhost:3000')
    res.header(
        'Access-Control-Allow-Headers',
        'Origin,X-Requested-With,Content-type,Accept'
    )
    next()
})
app.use(express.json())
app.use('/api',router)
app.use('/api',router2)
app.use('/api',router3)



app.get('/',(req,res)=>{

    res.send('supp bruv')
})

 
app.listen(port,()=>{
    console.log(`listening at ${port}`)
})

