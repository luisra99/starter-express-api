import {Router} from 'express'
import {getMaterials,createMaterials, updateMaterials, deleteMaterials, getMaterial} from '../controllers/material.controller.js'
const router=Router()

router.get('/material',getMaterials)
router.post('/material',createMaterials)
router.put('/material/:id',updateMaterials)
router.delete('/material/:id',deleteMaterials)
router.get('/material/:id',getMaterial)
export default router