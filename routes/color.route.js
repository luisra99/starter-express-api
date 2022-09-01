import {Router} from 'express'
import {getColors,createColors, updateColors, deleteColors, getColor} from '../controllers/color.controller.js'
const router=Router()

router.get('/color',getColors)
router.post('/color',createColors)
router.put('/color/:id',updateColors)
router.delete('/color/:id',deleteColors)
router.get('/color/:id',getColor)
export default router