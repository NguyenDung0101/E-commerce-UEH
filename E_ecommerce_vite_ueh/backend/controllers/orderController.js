
import orderModel from "../models/orderModel.js";
import userModel from '../models/userMobel.js';
import productModel from "../models/productModel.js";


// placing user order for user (bỏ tích hợp Stripe)
const placeOrder = async (req, res) => {

  const frontend_url = "http://localhost:5174";

  try {
    // Kiểm tra xem danh sách sản phẩm (items) có tồn tại và không rỗng
    if (!req.body.items || req.body.items.length === 0) {
      return res.json({
        success: false,
        message: "Không có sản phẩm nào trong đơn hàng. Thanh toán thất bại."
      });
    }

    // Tạo đơn hàng mới trong cơ sở dữ liệu
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address
    });

    await newOrder.save();
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

    // Giả lập tạo danh sách sản phẩm (không thực hiện thanh toán thật)
    const line_items = req.body.items.map((item) => ({
      name: item.name,
      unit_amount: item.new_price * 100, // giả lập giá trị
      quantity: item.quantity
    }));

    // Thêm phí giao hàng giả lập
    line_items.push({
      name: "Phí giao hàng",
      unit_amount: 200, // Giả lập phí giao hàng là 2 USD
      quantity: 1
    });

    // Giả lập xử lý thanh toán thành công
    const fakePaymentSuccess = true; // Giả lập thanh toán thành công

    if (fakePaymentSuccess) {
      // Nếu thanh toán giả lập thành công, chuyển hướng đến trang xác nhận thành công
      res.json({
        success: true,
        message: "Thanh toán thành công (giả lập).",
        orderId: newOrder._id,
        session_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`
      });
    } else {
      // Nếu thanh toán giả lập thất bại
      res.json({
        success: false,
        message: "Thanh toán thất bại (giả lập).",
        session_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}

const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;
  try {
    if (success === "true") {
      // Kiểm tra nếu đơn hàng đã thanh toán
      const existingOrder = await orderModel.findById(orderId);
      if (!existingOrder) {
        return res.json({ success: false, message: "Order không tồn tại." });
      }
      if (existingOrder.payment === true) {
        return res.json({ success: true, message: "Order đã được thanh toán trước đó." });
      }

      // Đánh dấu đơn hàng đã thanh toán
      await orderModel.findByIdAndUpdate(orderId, { payment: true });

      // Cập nhật `soldCount` cho từng sản phẩm trong `items`
      if (existingOrder.items && existingOrder.items.length > 0) {
        for (const item of existingOrder.items) {
          console.log("Attempting to update soldCount for productId:", item._id, "with quantity:", item.quantity);

          const updateResult = await productModel.findByIdAndUpdate(
            item._id,
            { $inc: { soldCount: item.quantity } },
            { new: true }
          );
          console.log("Update result for productId:", item._id, "->", updateResult);

          if (!updateResult) {
            console.log(`Product with ID ${item._id} not found or not updated.`);
          }
        }
      } else {
        console.log("Order items is empty or undefined.");
      }

      res.json({ success: true, message: "đã trả tiền" });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false, message: "chưa trả tiền" });
    }
  } catch (error) {
    console.log("Error in verifyOrder:", error);
    res.json({ success: false, message: "Thanh toán tiền không thành công" });
  }
};

// user's orders for user 
const useOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({userId:req.body.userId});
    res.json({success:true, data:orders})
  } catch (error) {
    console.log(error);
    res.json({success:false, message:"Không tìm thầy đơn hàng người dùng"})
  }
}

// List orders for admin panel
const listOrders = async (req,res) => {
  try {
    const orders = await orderModel.find({});
    res.json({success:true, data:orders})
  } catch (error) {
    console.log(error);
    res.json({success:false,message:"Không lấy được danh sách sản phẩm"})
  }
}

// api for updating order status
const updateStatus = async (req, res) => {
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status});
    res.json({success:true, message:"Cập nhật thành công"})
  } catch (error) {
    console.log(error);
    res.json({success:false, message:"Cập nhật thất bại"})
  }
}

export { placeOrder, verifyOrder, useOrders, listOrders, updateStatus };



