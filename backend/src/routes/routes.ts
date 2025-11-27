import { Router } from "express";
import { clientsRegisterController } from "../controller/clients.controller";



const router=Router()

router.post('/clients/register',clientsRegisterController)
router.post('/clients/login',clientLoginController)

router.get('/products/:id')
router.get('/products')
router.get('/products/category/:category')

router.post('/orders')
router.get('/orders')
router.get('/order/:id')
router.get('order/clients/:id')

router.post('/admin/products')
router.put('/admin/products/:id')
router.delete('/admin/products/:id')

router.get('/admin/orders')
router.put('admin/order/:id/status')


export default router