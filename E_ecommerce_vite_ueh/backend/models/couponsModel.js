import mongoose from "mongoose";

const couponsSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },  // Mã giảm giá, phải là duy nhất
    discount: { type: Number, required: true }, // Giá trị giảm giá
    discountType: { type: String, enum: ["percent", "fixed"], required: true }, // Loại giảm giá: phần trăm hoặc số tiền cố định
    expiryDate: { type: Date, required: true }, // Ngày hết hạn của mã giảm giá
    minPurchase: { type: Number, default: 0 }, // Điều kiện chi tiêu tối thiểu để áp dụng mã
    status: { type: String, default: "active", enum: ["active", "expired", "used"] }, // Trạng thái mã
    usageLimit: { type: Number, default: 1 }, // Giới hạn số lần sử dụng
    usedCount: { type: Number, default: 0 }, // Số lần đã sử dụng
    applicableTo: { type: [String], default: ["all"] }, // Danh sách loại sản phẩm áp dụng, mặc định cho tất cả
    createdDate: { type: Date, default: Date.now } // Ngày tạo mã giảm giá
});

const couponsModel = mongoose.models.coupons || mongoose.model("coupons", couponsSchema);
export default couponsModel;
