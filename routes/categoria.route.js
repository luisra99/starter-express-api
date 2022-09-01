import {Router} from 'express'
import {getCategorias,createCategorias, updateCategorias, deleteCategorias, getCategoria} from '../controllers/categoria.controller.js'
const router=Router()

router.get('/categoria',getCategorias)
router.post('/categoria',createCategorias)
router.put('/categoria/:id',updateCategorias)
router.delete('/categoria/:id',deleteCategorias)
router.get('/categoria/:id',getCategoria)
export default router