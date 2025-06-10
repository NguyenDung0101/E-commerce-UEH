import express from "express"
import { editUser, getUser, listUser, loginUser, registerUser, removeUser } from "../controllers/userController.js"
import authMiddleware from "../middleware/auth.js"

const userRouter = express.Router()

userRouter.post("/register",registerUser)
userRouter.post("/login",loginUser)
userRouter.post("/remove",removeUser)
userRouter.get("/list", listUser)
userRouter.post("/update", editUser)
userRouter.get("/profile", authMiddleware, getUser)
userRouter.put("/change-password", authMiddleware, getUser)


export default userRouter;
