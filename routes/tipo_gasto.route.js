import {Router} from 'express'
import {getTipoGasto,getTiposGasto,createTipoGasto,updateTipoGasto,deleteTipoGasto} from '../controllers/tipogasto.controller.js'
const router=Router()

router.get('/tipogasto',getTiposGasto)
router.post('/tipogasto',createTipoGasto)
router.put('/tipogasto/:id',updateTipoGasto)
router.delete('/tipogasto/:id',deleteTipoGasto)
router.get('/tipogasto/:id',getTipoGasto)
export default router