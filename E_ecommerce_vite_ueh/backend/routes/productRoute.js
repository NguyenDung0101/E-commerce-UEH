import express from "express"
import { addComment, addFavorite, addProduct,getComments,getFav,listProduct,removeProduct } from "../controllers/productController.js"
import multer from "multer"
import authMiddleware from "../middleware/auth.js";

const productRouter = express.Router();

// Image Storage Engine

const storage = multer.diskStorage({
  destination:"uploads",
  filename:(req,file,cb)=>{
    return cb(null, `${Date.now()}${file.originalname}`)
  }
})

// `${Date.now()}${file.originalname}`
// `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`

const upload = multer({storage : storage})

productRouter.post("/add",upload.single("image") ,addProduct);
productRouter.get("/list",listProduct);
productRouter.post("/remove",removeProduct);
productRouter.post("/addfavorite", authMiddleware ,addFavorite);
productRouter.post("/getfavorite",authMiddleware, getFav);
productRouter.post("/addcomment", authMiddleware, addComment);
productRouter.get("/getcomment/:productId", getComments);

export default productRouter;