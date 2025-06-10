import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  gender: { type: String, enum: ["nam", "nữ", "khác"], required: true },  // Thêm trường giới tính
  registrationDate: { type: Date, default: Date.now },  // Thêm trường ngày đăng ký
  cartData: { type: Object, default: {} },
  favData: { type: Object, default: {} },
}, { minimize: false });

const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel