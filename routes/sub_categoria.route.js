import {Router} from 'express'
import {getSubCategorias,createSubCategorias, updateSubCategorias, deleteSubCategorias, getSubCategoria} from '../controllers/subcategoria.controller.js'
const router=Router()

router.get('/subcategoria',getSubCategorias)
router.post('/subcategoria',createSubCategorias)
router.put('/subcategoria/:id',updateSubCategorias)
router.delete('/subcategoria/:id',deleteSubCategorias)
router.get('/subcategoria/:id',getSubCategoria)
export default router