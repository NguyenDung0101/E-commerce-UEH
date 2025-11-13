import mongoose from "mongoose";

export const connectDB = async ()=> {
  await mongoose.connect('mongodb+srv://dungnguyen:Dung112004@cluster0.p19j8.mongodb.net/e_ecommerce_vite').then(()=>console.log("DB Connected"));
}