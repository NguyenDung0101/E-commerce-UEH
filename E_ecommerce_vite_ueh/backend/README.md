# Backend API - UEH E-commerce

Backend nay dung Express, MongoDB/Mongoose va JWT de phuc vu website ban hang UEH Community Shop. Tai lieu nay tom tat cach chay backend, cac enum can dung dung gia tri, cau truc du lieu chinh va danh sach endpoint.

## 1. Yeu cau moi truong

- Node.js 18+.
- npm.
- MongoDB Atlas hoac MongoDB server tuong duong.
- Client frontend/admin dang goi mac dinh den backend qua `http://localhost:4000`.

## 2. Cai dat va chay local

```bash
cd backend
npm install
npm run server
```

Server se chay tai:

```text
http://localhost:4000
```

Kiem tra nhanh:

```bash
curl http://localhost:4000/
```

Neu thanh cong API tra ve:

```text
API Working
```

## 3. Bien moi truong can co

Backend dang doc `process.env.PORT` va `process.env.JWT_SECRET`. Nen tao file `.env` trong thu muc `backend/`:

```env
PORT=4000
JWT_SECRET=your_jwt_secret_here
```

Luu y: file `backend/config/db.js` hien dang ket noi MongoDB bang URI hard-code. De nguoi khac dung duoc de hon, nen chuyen URI nay sang `.env`, vi du:

```env
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>/<database>
```

Sau do cap nhat `connectDB()` de doc `process.env.MONGODB_URI`.

## 4. Cac ENUM can dung

### User `gender`

Duoc validate trong `models/userMobel.js` va `controllers/userController.js`.

| Gia tri | Y nghia |
| --- | --- |
| `nam` | Nam |
| `nữ` | Nu |
| `khác` | Khac |

Bat buoc dung dung chuoi tren khi dang ky/cap nhat user. Vi du:

```json
{
  "gender": "nam"
}
```

### Coupon `discountType`

Duoc enforce trong `models/couponsModel.js`.

| Gia tri | Y nghia |
| --- | --- |
| `percent` | Giam theo phan tram |
| `fixed` | Giam so tien co dinh |

Vi du:

```json
{
  "discount": 10,
  "discountType": "percent"
}
```

### Coupon `status`

Duoc enforce trong `models/couponsModel.js`.

| Gia tri | Y nghia |
| --- | --- |
| `active` | Ma dang hoat dong va co the ap dung |
| `expired` | Ma da het han/khong con hieu luc |
| `used` | Ma da duoc danh dau la da su dung |

Mac dinh khi tao coupon moi la `active`.

### Order `status`

Trong `models/orderModel.js`, `status` hien chua co `enum` cua Mongoose, nhung backend/admin dang su dung cac gia tri sau:

| Gia tri | Nguon su dung |
| --- | --- |
| `Xử lý đơn hàng` | Gia tri mac dinh trong model order |
| `Đang xử lý` | Dropdown cap nhat trang thai trong admin |
| `Đang giao` | Dropdown cap nhat trang thai trong admin |
| `Đã giao` | Dropdown cap nhat trang thai trong admin |

Khuyen nghi dong bo lai thanh mot bo gia tri duy nhat. Hien tai co su khac nhau giua default `Xử lý đơn hàng` va option admin `Đang xử lý`.

### Product `category`

Backend chi luu `category` dang string, chua enforce enum trong Mongoose. Tuy nhien admin/frontend dang dung cac category chinh:

| Gia tri | Hien thi |
| --- | --- |
| `uehfood` | UEH Food |
| `thoitrang` | Thoi trang |
| `dungcu` | Dung cu hoc tap |
| `luuniem` | Qua luu niem |

Nen dung cac gia tri nay khi them san pham de frontend loc va dieu huong dung.

### Coupon `applicableTo`

`applicableTo` la mang string. Gia tri mac dinh:

```json
["all"]
```

Neu muon gioi han theo danh muc san pham, nen dung cac `product.category` dang dung nhu `uehfood`, `thoitrang`, `dungcu`, `luuniem`.

## 5. Cau truc du lieu chinh

### User

```json
{
  "name": "Nguyen Van A",
  "email": "a@example.com",
  "password": "12345678",
  "phone": "0900000000",
  "dateOfBirth": "2000-01-01",
  "gender": "nam"
}
```

Sau khi dang ky/dang nhap thanh cong, API tra ve JWT token. Middleware hien tai doc token truc tiep tu header `token`, nen cac route can dang nhap dung header:

```http
token: <jwt_token>
```

### Product

Them san pham dung `multipart/form-data` vi co upload anh.

| Field | Kieu | Bat buoc | Ghi chu |
| --- | --- | --- | --- |
| `name` | string | Co | Ten san pham |
| `description` | string | Co | Mo ta |
| `image` | file | Co | Anh upload, field name la `image` |
| `category` | string | Co | Nen dung enum category o tren |
| `new_price` | number | Co | Gia moi |
| `old_price` | number | Co | Gia cu |
| `brand` | string | Khong | Mac dinh `Đang cập nhật` |
| `weight` | string | Khong | Mac dinh `Đang cập nhật` |
| `specifications` | string | Khong | Mac dinh `Đang cập nhật` |
| `color` | string | Khong | Mac dinh `Đang cập nhật` |

### Coupon

```json
{
  "code": "SALE10",
  "discount": 10,
  "discountType": "percent",
  "expiryDate": "2026-12-31",
  "minPurchase": 100000,
  "usageLimit": 100,
  "applicableTo": ["all"]
}
```

### Order

```json
{
  "items": [
    {
      "_id": "product_id",
      "name": "Ao UEH",
      "new_price": 120000,
      "quantity": 2
    }
  ],
  "amount": 240000,
  "address": {
    "Name": "Nguyen Van A",
    "email": "a@example.com",
    "street": "123 Nguyen Van Linh",
    "city": "Quan 7",
    "state": "Giao hang tieu chuan",
    "zipcode": "700000",
    "country": "Viet Nam",
    "phone": "0900000000"
  }
}
```

`userId` duoc them vao `req.body` boi middleware auth.

## 6. Danh sach endpoint

Base URL local:

```text
http://localhost:4000
```

### User

| Method | Endpoint | Auth | Mo ta |
| --- | --- | --- | --- |
| `POST` | `/api/user/register` | Khong | Dang ky user moi |
| `POST` | `/api/user/login` | Khong | Dang nhap, tra ve token |
| `GET` | `/api/user/list` | Khong | Lay danh sach user |
| `POST` | `/api/user/remove` | Khong | Xoa user theo `id` trong body |
| `POST` | `/api/user/update` | Khong | Cap nhat user theo `id` trong body |
| `GET` | `/api/user/profile` | Co | Lay profile user hien tai |
| `PUT` | `/api/user/change-password` | Co | Hien dang map nham controller `getUser`, can sua route sang `changePassword` truoc khi dung |

### Product

| Method | Endpoint | Auth | Mo ta |
| --- | --- | --- | --- |
| `POST` | `/api/product/add` | Khong | Them san pham moi bang `multipart/form-data` |
| `GET` | `/api/product/list` | Khong | Lay danh sach san pham |
| `POST` | `/api/product/remove` | Khong | Xoa san pham theo `id` trong body |
| `POST` | `/api/product/addfavorite` | Co | Bat/tat yeu thich san pham theo `itemId` |
| `POST` | `/api/product/getfavorite` | Co | Lay danh sach yeu thich cua user |
| `POST` | `/api/product/addcomment` | Co | Them binh luan/danh gia san pham |
| `GET` | `/api/product/getcomment/:productId` | Khong | Lay binh luan theo san pham |
| `GET` | `/images/:filename` | Khong | Lay anh san pham trong thu muc `uploads` |

### Cart

| Method | Endpoint | Auth | Mo ta |
| --- | --- | --- | --- |
| `POST` | `/api/cart/add` | Co | Tang so luong san pham trong gio, body can `itemId` |
| `POST` | `/api/cart/remove` | Co | Giam so luong san pham trong gio, body can `itemId` |
| `POST` | `/api/cart/get` | Co | Lay gio hang cua user |

### Order

| Method | Endpoint | Auth | Mo ta |
| --- | --- | --- | --- |
| `POST` | `/api/order/place` | Co | Tao don hang |
| `POST` | `/api/order/verify` | Khong | Xac nhan thanh toan gia lap |
| `POST` | `/api/order/userorders` | Co | Lay don hang cua user |
| `GET` | `/api/order/list` | Khong | Lay tat ca don hang cho admin |
| `POST` | `/api/order/status` | Khong | Cap nhat trang thai don hang |

### Coupon

| Method | Endpoint | Auth | Mo ta |
| --- | --- | --- | --- |
| `POST` | `/api/coupons/add` | Khong | Tao coupon moi |
| `GET` | `/api/coupons/list` | Khong | Lay danh sach coupon |
| `GET` | `/api/coupons/get/:id` | Khong | Lay chi tiet coupon |
| `PUT` | `/api/coupons/update/:id` | Khong | Cap nhat coupon |
| `DELETE` | `/api/coupons/remove/:id` | Khong | Xoa coupon |
| `POST` | `/api/coupons/apply` | Khong | Ap dung coupon theo `code` va `amount` |

## 7. Vi du goi API

### Dang ky

```bash
curl -X POST http://localhost:4000/api/user/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Nguyen Van A",
    "email": "a@example.com",
    "password": "12345678",
    "phone": "0900000000",
    "dateOfBirth": "2000-01-01",
    "gender": "nam"
  }'
```

### Dang nhap

```bash
curl -X POST http://localhost:4000/api/user/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "a@example.com",
    "password": "12345678"
  }'
```

### Them san pham

```bash
curl -X POST http://localhost:4000/api/product/add \
  -F "name=Ao thun UEH" \
  -F "description=Ao thun thuong hieu UEH" \
  -F "category=thoitrang" \
  -F "new_price=120000" \
  -F "old_price=150000" \
  -F "brand=UEH Shop" \
  -F "weight=200g" \
  -F "specifications=Size M" \
  -F "color=Trang" \
  -F "image=@/path/to/image.png"
```

### Tao coupon

```bash
curl -X POST http://localhost:4000/api/coupons/add \
  -H "Content-Type: application/json" \
  -d '{
    "code": "SALE10",
    "discount": 10,
    "discountType": "percent",
    "expiryDate": "2026-12-31",
    "minPurchase": 100000,
    "usageLimit": 100,
    "applicableTo": ["all"]
  }'
```

### Cap nhat trang thai don hang

```bash
curl -X POST http://localhost:4000/api/order/status \
  -H "Content-Type: application/json" \
  -d '{
    "orderId": "ORDER_ID",
    "status": "Đang giao"
  }'
```

## 8. Luu y ky thuat

- Nhieu endpoint admin hien chua co auth middleware (`/api/product/add`, `/api/order/list`, `/api/coupons/*`, ...). Neu deploy public nen them phan quyen admin.
- Auth middleware hien doc header `token`, khong doc `Authorization: Bearer <token>`.
- `order.status` nen duoc them enum trong Mongoose de tranh luu sai chinh ta.
- `product.category` nen duoc them enum neu he thong chi ho tro 4 danh muc chinh.
- Route `/api/user/change-password` hien dang import `changePassword` trong controller nhung route lai goi `getUser`; can sua truoc khi su dung doi mat khau.
- `models/userMobel.js` co ten file typo la `Mobel`; neu doi ten file can cap nhat tat ca import lien quan.


## 9. file .env:
PORT=4000
JWT_SECRET=mock_jwt_secret_for_local_dev
MONGODB_URI=mongodb+srv://mock_user:mock_password@mock-cluster.mongodb.net/e_ecommerce_vite

# ENUM values
USER_GENDER_ENUM=nam,nữ,khác
COUPON_DISCOUNT_TYPE_ENUM=percent,fixed
COUPON_STATUS_ENUM=active,expired,used
ORDER_STATUS_ENUM=Xử lý đơn hàng,Đang xử lý,Đang giao,Đã giao
PRODUCT_CATEGORY_ENUM=uehfood,thoitrang,dungcu,luuniem
COUPON_APPLICABLE_TO_ENUM=all,uehfood,thoitrang,dungcu,luuniem

# Default/mock values
DEFAULT_COUPON_STATUS=active
DEFAULT_ORDER_STATUS=Xử lý đơn hàng
DEFAULT_PRODUCT_CATEGORY=uehfood
DEFAULT_COUPON_APPLICABLE_TO=all