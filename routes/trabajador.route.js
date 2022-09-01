import {Router} from 'express'
import {getTrabajadores,createTrabajador, updateTrabajador, deleteTrabajador, getTrabajador} from '../controllers/trabajador.controller.js'
const router=Router()

router.get('/trabajador',getTrabajadores)
router.post('/trabajador',createTrabajador)
router.put('/trabajador/:id',updateTrabajador)
router.delete('/trabajador/:id',deleteTrabajador)
router.get('/trabajador/:id',getTrabajador)
export default router