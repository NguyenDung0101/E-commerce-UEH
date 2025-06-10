import productModel from "../models/productModel.js"; // Import mô hình sản phẩm để thao tác với cơ sở dữ liệu
import fs from 'fs'; // Import thư viện hệ thống tập tin để làm việc với các file ảnh
import userModel from "../models/userModel.js"; // Import mô hình người dùng

// ----------------------------
// Quản trị viên - Thêm sản phẩm mới
// ----------------------------
const addProduct = async (req, res) => {
  // Kiểm tra nếu không có file tải lên trong yêu cầu
  if (!req.file) {
    return res.status(400).json({ success: false, message: "Không có file được tải lên" });
  }

  // Lưu tên file ảnh được tải lên từ yêu cầu
  let image_filename = `${req.file.filename}`;

  // Tạo đối tượng sản phẩm mới với các thuộc tính lấy từ yêu cầu
  const product = new productModel({
    name: req.body.name, // Tên sản phẩm
    description: req.body.description, // Mô tả sản phẩm
    image: image_filename, // Đường dẫn ảnh sản phẩm
    category: req.body.category, // Danh mục sản phẩm
    new_price: req.body.new_price, // Giá mới
    old_price: req.body.old_price, // Giá cũ
    brand: req.body.brand || "Đang cập nhật", // Thương hiệu (nếu không có thì mặc định là "Đang cập nhật")
    weight: req.body.weight || "Đang cập nhật", // Trọng lượng sản phẩm
    specifications: req.body.specifications || "Đang cập nhật", // Thông số kỹ thuật
    color: req.body.color || "Đang cập nhật" // Màu sắc sản phẩm
  });

  try {
    // Lưu sản phẩm vào cơ sở dữ liệu
    await product.save();
    // Phản hồi thành công nếu lưu sản phẩm thành công
    res.json({ success: true, message: "Sản phẩm đã được thêm thành công" });
  } catch (error) {
    // Ghi log lỗi và phản hồi thất bại nếu có lỗi xảy ra
    console.log(error);
    res.json({ success: false, message: "Lỗi khi thêm sản phẩm" });
  }
}

// ----------------------------
// Lấy danh sách tất cả sản phẩm
// ----------------------------
const listProduct = async (req, res) => {
  try {
    // Truy vấn tất cả sản phẩm từ cơ sở dữ liệu
    const products = await productModel.find({});
    // Trả về danh sách sản phẩm
    res.json({ success: true, data: products });
  } catch (error) {
    // Ghi log lỗi và phản hồi thất bại nếu có lỗi xảy ra
    console.log(error);
    res.json({ success: false, message: "Lỗi khi lấy danh sách sản phẩm" });
  }
}

// ----------------------------
// Xóa sản phẩm
// ----------------------------
const removeProduct = async (req, res) => {
  try {
    // Tìm sản phẩm dựa trên ID để lấy đường dẫn ảnh
    const product = await productModel.findById(req.body.id);
    // Xóa file ảnh của sản phẩm trong thư mục lưu trữ
    fs.unlink(`uploads/${product.image}`, () => {});

    // Xóa sản phẩm khỏi cơ sở dữ liệu
    await productModel.findByIdAndDelete(req.body.id);
    // Phản hồi thành công nếu xóa thành công
    res.json({ success: true, message: "Sản phẩm đã được xóa" });
  } catch (error) {
    // Ghi log lỗi và phản hồi thất bại nếu có lỗi xảy ra
    console.log(error);
    res.json({ success: false, message: "Lỗi khi xóa sản phẩm" });
  }
}

// ----------------------------
// Người dùng - Thêm sản phẩm vào danh sách yêu thích
// ----------------------------
const addFavorite = async (req, res) => {
  try {
    // Tìm người dùng theo ID từ yêu cầu
    let userData = await userModel.findById(req.body.userId);
    let favData = userData.favData;

    // Kiểm tra nếu sản phẩm đã có trong danh sách yêu thích
    if (!favData[req.body.itemId]) {
      favData[req.body.itemId] = 1; // Thêm sản phẩm vào yêu thích
    } else {
      favData[req.body.itemId] = 0; // Xóa sản phẩm khỏi yêu thích
    }

    // Phản hồi thành công khi đã cập nhật yêu thích
    res.json({
      success: true,
      message: favData[req.body.itemId] === 1 ? "Đã thêm sản phẩm vào yêu thích" : "Đã xóa sản phẩm khỏi yêu thích"
    });

    // Cập nhật danh sách yêu thích của người dùng trong cơ sở dữ liệu
    await userModel.findByIdAndUpdate(req.body.userId, { favData });

  } catch (error) {
    // Ghi log lỗi và phản hồi thất bại nếu có lỗi xảy ra
    console.log(error);
    res.status(500).json({ success: false, message: "Lỗi khi thêm vào yêu thích" });
  }
};

// ----------------------------
// Lấy danh sách sản phẩm yêu thích của người dùng
// ----------------------------
const getFav = async (req, res) => {
  try {
    // Tìm người dùng và lấy danh sách yêu thích
    let userData = await userModel.findById(req.body.userId);
    let favData = userData.favData;
    // Phản hồi thành công kèm theo danh sách yêu thích
    res.json({ success: true, favData });
  } catch (error) {
    // Ghi log lỗi và phản hồi thất bại nếu có lỗi xảy ra
    console.log(error);
    res.json({ success: false, message: "Lỗi khi lấy danh sách yêu thích" });
  }
}

// ----------------------------
// Thêm bình luận vào sản phẩm
// ----------------------------
const addComment = async (req, res) => {
  try {
    const { productId, commentText, rating } = req.body;
    const userId = req.body.userId;

    // Tìm sản phẩm dựa trên ID
    const product = await productModel.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: "Không tìm thấy sản phẩm" });
    }

    // Tìm người dùng để lấy tên hiển thị cho bình luận
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "Không tìm thấy người dùng" });
    }

    // Tạo bình luận mới với thông tin từ yêu cầu và thời gian tạo hiện tại
    const newComment = {
      customerName: user.name, // Tên khách hàng (từ userModel)
      commentText, // Nội dung bình luận
      rating, // Đánh giá của khách hàng
      createdAt: new Date(), // Ngày giờ tạo bình luận
    };
    // Thêm bình luận mới vào danh sách bình luận của sản phẩm
    product.comments.push(newComment);

    // Cập nhật số lượng đánh giá và tính lại rating trung bình
    product.reviewCount += 1;
    product.averageRating = product.comments.reduce((sum, comment) => sum + comment.rating, 0) / product.reviewCount;

    // Lưu sản phẩm với bình luận mới
    await product.save();
    res.json({ success: true, message: "Đã thêm bình luận", comments: product.comments });
  } catch (error) {
    // Ghi log lỗi và phản hồi thất bại nếu có lỗi xảy ra
    console.log(error);
    res.status(500).json({ success: false, message: "Lỗi khi thêm bình luận" });
  }
};

// ----------------------------
// Lấy danh sách bình luận của sản phẩm
// ----------------------------
const getComments = async (req, res) => {
  try {
    const { productId } = req.params;

    // Tìm sản phẩm theo ID
    const product = await productModel.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: "Không tìm thấy sản phẩm" });
    }

    // Trả về danh sách bình luận của sản phẩm
    res.json({ success: true, comments: product.comments });
  } catch (error) {
    // Ghi log lỗi và phản hồi thất bại nếu có lỗi xảy ra
    console.log(error);
    res.status(500).json({ success: false, message: "Lỗi khi lấy bình luận" });
  }
};

// Xuất các hàm để sử dụng ở nơi khác
export { addProduct, listProduct, removeProduct, addFavorite, getFav, addComment, getComments };
