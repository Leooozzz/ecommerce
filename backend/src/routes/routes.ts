import { Router } from "express";
import {
  clientLoginController,
  clientsRegisterController,
} from "../controller/clients.controller";
import {
  getAllProducts,
  getProductForCategory,
  getSingleProduct,
} from "../controller/product.controller";
import {
  adminPostProducts,
  adminProductDelete,
  adminProductsupdate,
} from "../controller/adminProducts.controller";
import {
  createOrderController,
  getOrderByIdController,
  getOrdersByClientController,
  getOrdersController,
} from "../controller/order.controller";
import { adminGetOrder, adminUpdateOrder } from "../controller/adminOrder.controller";

const router = Router();

router.post("/clients/register", clientsRegisterController);
router.post("/clients/login", clientLoginController);

router.get("/products/:id", getSingleProduct);
router.get("/products", getAllProducts);
router.get("/products/category/:category", getProductForCategory);

router.post("/orders", createOrderController);
router.get("/orders", getOrdersController);
router.get("/order/:id", getOrderByIdController);
router.get("/order/clients/:id", getOrdersByClientController);

router.post("/admin/products", adminPostProducts);
router.put("/admin/products/:id", adminProductsupdate);
router.delete("/admin/products/:id", adminProductDelete);

router.get("/admin/orders",adminGetOrder);
router.put("admin/order/:id/status",adminUpdateOrder);

export default router;
