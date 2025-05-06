import {Router} from 'express';
import {getInfo, pruebaConexionDB} from '../controllers/info.controller';



const router = Router();



router.get('/', getInfo);
router.get('/pruebaConexion', pruebaConexionDB);



export default router;