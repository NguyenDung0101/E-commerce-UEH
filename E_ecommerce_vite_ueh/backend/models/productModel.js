import mongoose from "mongoose";

// Schema cho sản phẩm
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  new_price: { type: Number, required: true },
  old_price: { type: Number, required: true },
  reviewCount: { type: Number, default: 0 },   // Số lượng đánh giá
  soldCount: { type: Number, default: 0 }, // Thêm trường số lượng đã bán
  comments: [
    {
      customerName: String,
      commentText: String,
      rating: Number, // Giá trị đánh giá từ 1 đến 5
      createdAt: { type: Date, default: Date.now },
    },
  ],
  averageRating: { type: Number, default: 0 }, // Thêm thuộc tính này để lưu rating trung bình
  // Thêm các trường thông số kỹ thuật mới
  brand: { type: String, default: "Đang cập nhật" },
  weight: { type: String, default: "Đang cập nhật" },
  specifications: { type: String, default: "Đang cập nhật" },
  color: { type: String, default: "Đang cập nhật" }
});


productSchema.methods.calculateAverageRating = function () {
  if (this.comments.length === 0) return 0;

  const sumRatings = this.comments.reduce((total, comment) => total + comment.rating, 0);
  return (sumRatings / this.comments.length).toFixed(1); // Tính trung bình và làm tròn 1 chữ số
};


const productModel = mongoose.models.product || mongoose.model("product", productSchema);

export default productModel;
