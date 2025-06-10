import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import productRouter from "./routes/productRoute.js"
import userRouter from "./routes/userRoute.js"
import 'dotenv/config'
import cartRouter from "./routes/cartRouter.js"
import orderRouter from "./routes/orderRoute.js"
import couponRouter from "./routes/couponRouter.js"



// app config
const app = express()
const prot = process.env.PORT || 4000;


// middleware
app.use(express.json())
app.use(cors())

// db connection
connectDB();

// api endpoints
app.use("/api/product",productRouter)
app.use("/images", express.static('uploads'))
app.use("/api/user", userRouter)
app.use("/api/cart", cartRouter)
app.use("/api/order", orderRouter)
app.use("/api/coupons", couponRouter)


app.get("/",(req,res)=>{
  res.send("API Working")
})

app.listen(prot,()=> {
  console.log(`Server Started on http://localhost:${prot}`)
})

