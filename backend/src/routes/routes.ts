import { Router } from "express";
import { clientLoginController, clientsRegisterController } from "../controller/clients.controller";
import { getAllProducts, getProductForCategory, getSingleProduct } from "../controller/product.controller";
import { adminPostProducts } from "../controller/adminProducts.controller";



const router=Router()

router.post('/clients/register',clientsRegisterController)
router.post('/clients/login',clientLoginController)

router.get('/products/:id',getSingleProduct)
router.get('/products',getAllProducts)
router.get('/products/category/:category',getProductForCategory)

router.post('/orders')
router.get('/orders')
router.get('/order/:id')
router.get('/order/clients/:id')

router.post('/admin/products',adminPostProducts)
router.put('/admin/products/:id')
router.delete('/admin/products/:id')

router.get('/admin/orders')
router.put('admin/order/:id/status')


export default router