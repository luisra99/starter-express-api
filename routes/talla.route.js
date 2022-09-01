import {Router} from 'express'
import {getTallas,createTallas, updateTallas, deleteTallas, getTalla} from '../controllers/talla.controller.js'
const router=Router()

router.get('/talla',getTallas)
router.post('/talla',createTallas)
router.put('/talla/:id',updateTallas)
router.delete('/talla/:id',deleteTallas)
router.get('/talla/:id',getTalla)
export default router