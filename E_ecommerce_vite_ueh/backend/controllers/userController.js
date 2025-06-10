import userModel from "../models/userMobel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator"


// đăng nhập user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User Doesn's exist" })
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid credentials" })
    }

    const token = createToken(user._id);
    res.json({ success: true, token })

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" })
  }
}

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET)
}

// register user
const registerUser = async (req, res) => {
  const { name, password, email, phone, dateOfBirth, gender } = req.body;
  try {
    // checking is user already exists
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "User already exists" })
    }
    // validating email format &strong password
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Please enter a valid email" })
    }
    if (password.length < 8) {
      return res.json({ success: false, message: "Please enter a strong password" })
    }

    // validating phone number
    if (!validator.isMobilePhone(phone, 'any')) {
      return res.json({ success: false, message: "Please enter a valid phone number" });
    }

    // validating date of birth (ensure it's a valid date)
    if (!validator.isDate(dateOfBirth)) {
      return res.json({ success: false, message: "Please enter a valid date of birth" });
    }

    // validating gender (only allow "male", "female", or "other")
    if (!["nam", "nữ", "khác"].includes(gender)) {
      return res.json({ success: false, message: "Please select a valid gender" });
    }

    //hashing user password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name: name,
      email: email,
      password: hashedPassword,
      phone: phone,
      dateOfBirth: dateOfBirth,
      gender: gender
    })

    const user = await newUser.save()
    const token = createToken(user._id)
    res.json({ success: true, token })

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" })
  }
}

// admin can edit user
const editUser = async (req, res) => {
  const { id } = req.body; // Lấy id người dùng từ body (hoặc từ req.params nếu dùng route)
  const { name, email, phone, dateOfBirth, gender } = req.body;

  try {
    // Tìm người dùng theo id
    const user = await userModel.findById(id);

    if (!user) {
      return res.json({ success: false, message: "User doesn't exist" });
    }

    // Kiểm tra và cập nhật thông tin mới (nếu có)
    if (name) user.name = name;
    if (email) {
      if (!validator.isEmail(email)) {
        return res.json({ success: false, message: "Please enter a valid email" });
      }
      user.email = email;
    }
    if (phone) {
      if (!validator.isMobilePhone(phone, 'any')) {
        return res.json({ success: false, message: "Please enter a valid phone number" });
      }
      user.phone = phone;
    }
    if (dateOfBirth) {
      if (!validator.isDate(dateOfBirth)) {
        return res.json({ success: false, message: "Please enter a valid date of birth" });
      }
      user.dateOfBirth = dateOfBirth;
    }
    if (gender) {
      if (!["nam", "nữ", "khác"].includes(gender)) {
        return res.json({ success: false, message: "Please select a valid gender" });
      }
      user.gender = gender;
    }

    // Lưu thay đổi
    await user.save();

    res.json({ success: true, message: "User updated successfully", user });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error while updating user" });
  }
};



const listUser = async (req, res) => {
  try {
    const users = await userModel.find({});
    res.json({ success: true, data: users })
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Errot" })
  }
}

const removeUser = async (req, res) => {
  try {
    // Xóa người dùng theo ID trực tiếp
    const user = await userModel.findByIdAndDelete(req.body.id);

    // Kiểm tra xem người dùng có tồn tại không
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    res.json({ success: true, message: "User removed successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Không xóa tài khoản được" })
  }
}

// For user
// get profileUser
const getUser = async (req, res) => {
  try {
    const userId = req.body.userId; // Lấy ID người dùng từ middleware
    const user = await userModel.findById(userId).select('-password'); // Bỏ qua password để không trả về

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json({ success: true, data: user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error while fetching user data" });
  }
};

// Change Password
const changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const userId = req.userId; // Lấy ID từ middleware hoặc req.body tùy theo thiết kế của bạn

  try {
    const user = await userModel.findById(userId);

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Mật khẩu hiện tại không đúng" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedNewPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedNewPassword;
    await user.save();

    res.json({ success: true, message: "Đổi mật khẩu thành công" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Có lỗi xảy ra khi đổi mật khẩu" });
  }
};



export { loginUser, registerUser, editUser, listUser, removeUser, getUser, changePassword }