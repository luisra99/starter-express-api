import {Router} from 'express'
import {getProductoExists,createProductoExist,mermarProductoExist, updateProductoExist, deleteProductoExist, getProductoExist,soldProductoExist} from '../controllers/productoexist.controller.js'
const router=Router()

router.get('/productoexist',getProductoExists)
router.post('/productoexist',createProductoExist)
router.put('/productoexist/:id',updateProductoExist)
router.delete('/productoexist/:id',deleteProductoExist)
router.get('/productoexist/:id',getProductoExist)
router.post('/productoexist/sold/:id',soldProductoExist)
router.post('/productoexist/mermar/:id',mermarProductoExist)
export default router


