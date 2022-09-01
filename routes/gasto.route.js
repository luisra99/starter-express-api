import {Router} from 'express'
import {getGastos,getGasto,createGasto,updateGasto,deleteGasto} from '../controllers/gasto.controller.js'
const router=Router()

router.get('/gasto',getGastos)
router.post('/gasto',createGasto)
router.put('/gasto/:id',updateGasto)
router.delete('/gasto/:id',deleteGasto)
router.get('/gasto/:id',getGasto)
export default router