import {Router} from 'express'
import {getCurvaturas,createCurvaturas, updateCurvaturas, deleteCurvaturas, getCurvatura} from '../controllers/curvatura.controller.js'
const router=Router()

router.get('/curvatura',getCurvaturas)
router.post('/curvatura',createCurvaturas)
router.put('/curvatura/:id',updateCurvaturas)
router.delete('/curvatura/:id',deleteCurvaturas)
router.get('/curvatura/:id',getCurvatura)
export default router