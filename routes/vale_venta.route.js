import {Router} from 'express'
import {clear} from '../controllers/vales.controller.js'

const router=Router()
router.get('/')
router.post('/')
router.put('/')
router.delete('/vales',clear)
router.get('/')
export default router