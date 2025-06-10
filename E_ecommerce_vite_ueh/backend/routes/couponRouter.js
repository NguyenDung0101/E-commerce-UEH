import express from 'express';
import { addCoupons, applyCoupon, getCoupon, listCoupon, removeCoupon, updateCoupon } from '../controllers/couponsController.js';

const couponRouter = express.Router();

// Thêm mã giảm giá
couponRouter.post("/add", addCoupons);

// Lấy danh sách mã giảm giá
couponRouter.get("/list", listCoupon);

// Xóa mã giảm giá theo ID
couponRouter.delete("/remove/:id", removeCoupon);

// Cập nhật mã giảm giá theo ID
couponRouter.put("/update/:id", updateCoupon);

// Áp dụng mã giảm giá
couponRouter.post("/apply", applyCoupon);

// Lấy chi tiết một mã giảm giá theo ID
couponRouter.get("/get/:id", getCoupon);

export default couponRouter;
