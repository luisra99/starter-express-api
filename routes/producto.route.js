import {Router} from 'express'
import {getProductos,createProducto, updateProducto, deleteProducto, getProducto} from '../controllers/producto.controller.js'
const router=Router()

router.get('/producto',getProductos)
router.post('/producto',createProducto)
router.put('/producto/:id',updateProducto)
router.delete('/producto/:id',deleteProducto)
router.get('/producto/:id',getProducto)
export default router