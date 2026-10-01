import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose.connect('mongodb+srv://dungnguyen:[EMAIL_ADDRESS]/e_ecommerce_vite').then(() => console.log("DB Connected"));
}