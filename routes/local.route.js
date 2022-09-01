import {Router} from 'express'
import {getLocals,createLocal, updateLocal, deleteLocal, getLocal} from '../controllers/local.controller.js'
const router=Router()

router.get('/local',getLocals)
router.post('/local',createLocal)
router.put('/local/:id',updateLocal)
router.delete('/local/:id',deleteLocal)
router.get('/local/:id',getLocal)
export default router