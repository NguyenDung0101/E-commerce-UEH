import couponsModel from "../models/couponsModel.js";

// Add a new coupon
const addCoupons = async (req, res) => {
  const { code, discount, discountType, expiryDate, minPurchase, usageLimit, applicableTo } = req.body;

  try {
    // Kiểm tra xem mã giảm giá đã tồn tại chưa
    const existingCoupon = await couponsModel.findOne({ code });
    if (existingCoupon) {
      return res.status(400).json({ success: false, message: "Mã giảm giá này đã tồn tại!" });
    }

    // Tạo mã giảm giá mới
    const newCoupon = new couponsModel({
      code,
      discount,
      discountType,
      expiryDate,
      minPurchase,
      usageLimit,
      applicableTo,
      status: "active",
    });

    // Lưu mã giảm giá vào cơ sở dữ liệu
    await newCoupon.save();
    return res.status(201).json({ success: true, message: "Tạo mã giảm giá thành công!", coupon: newCoupon });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Lỗi khi thêm mã giảm giá.", error });
  }
};

// List all coupons
const listCoupon = async (req, res) => {
  try {
    const coupons = await couponsModel.find();
    return res.status(200).json({ success: true, data: coupons });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Lỗi khi lấy danh sách mã giảm giá.", error });
  }
};

// Remove a coupon
const removeCoupon = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedCoupon = await couponsModel.findByIdAndDelete(id);
    if (!deletedCoupon) {
      return res.status(404).json({ success: false, message: "Không tìm thấy mã giảm giá để xóa." });
    }

    return res.status(200).json({ success: true, message: "Xóa mã giảm giá thành công!", coupon: deletedCoupon });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Lỗi khi xóa mã giảm giá.", error });
  }
};

// Update a coupon
const updateCoupon = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const updatedCoupon = await couponsModel.findByIdAndUpdate(id, updates, { new: true });
    if (!updatedCoupon) {
      return res.status(404).json({ success: false, message: "Không tìm thấy mã giảm giá để cập nhật." });
    }

    return res.status(200).json({ success: true, message: "Cập nhật mã giảm giá thành công!", coupon: updatedCoupon });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Lỗi khi cập nhật mã giảm giá.", error });
  }
};

// Apply a coupon (check validity and return discount amount)
const applyCoupon = async (req, res) => {
  const { code, amount } = req.body;

  try {
    const coupon = await couponsModel.findOne({ code });

    // Kiểm tra mã giảm giá có tồn tại và còn hiệu lực
    if (!coupon) {
      return res.status(404).json({ success: false, message: "Mã giảm giá không hợp lệ." });
    }
    if (coupon.status !== "active") {
      return res.status(400).json({ success: false, message: "Mã giảm giá không còn hiệu lực." });
    }
    if (new Date() > new Date(coupon.expiryDate)) {
      return res.status(400).json({ success: false, message: "Mã giảm giá đã hết hạn." });
    }
    if (coupon.usageLimit <= coupon.usedCount) {
      return res.status(400).json({ success: false, message: "Mã giảm giá đã đạt số lần sử dụng tối đa." });
    }
    if (amount < coupon.minPurchase) {
      return res.status(400).json({ success: false, message: `Đơn hàng cần đạt tối thiểu ${coupon.minPurchase} để áp dụng mã giảm giá này.` });
    }

    // Tính toán giá trị giảm giá
    const discountAmount = coupon.discountType === "percent"
      ? (amount * (coupon.discount / 100))
      : coupon.discount;

    // Cập nhật số lần sử dụng mã giảm giá
    coupon.usedCount = coupon.usedCount + 1;
    await coupon.save();

    return res.status(200).json({
      success: true,
      message: "Áp dụng mã giảm giá thành công!",
      discountAmount,
      finalAmount: amount - discountAmount
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Lỗi khi áp dụng mã giảm giá.", error });
  }
};

// Get details of a specific coupon
const getCoupon = async (req, res) => {
  const { id } = req.params;

  try {
    const coupon = await couponsModel.findById(id);
    if (!coupon) {
      return res.status(404).json({ success: false, message: "Không tìm thấy mã giảm giá." });
    }

    return res.status(200).json({ success: true, data: coupon });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Lỗi khi lấy thông tin mã giảm giá.", error });
  }
};

export { addCoupons, listCoupon, removeCoupon, updateCoupon, applyCoupon, getCoupon };



