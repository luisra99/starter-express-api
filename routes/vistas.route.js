import {Router} from 'express'
import {getExist,getVales,getGastos,getActualidad,getActualidadLocal,getActualidadTrabajador} from '../controllers/vistas.controller.js'
const router=Router()

router.get('/view/existencia',getExist)
router.get('/view/vales',getVales)
router.get('/view/gastos',getGastos)
router.get('/view/resumen/general',getActualidad)
router.get('/view/local',getActualidadLocal)
router.get('/view/trabajador',getActualidadTrabajador)


export default router