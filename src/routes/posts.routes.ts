import {Router} from 'express';
import { getEgals, getEjesTematicos, postAleatorio, threerandompost } from '../controllers/post.controller';
//import { authMiddleware } from '../middlewares/auth.middlewares';
const postsRoutes = Router();



postsRoutes.get('/posts/egals', getEgals); //endpoint para mostrar todos los egals 
postsRoutes.get('/posts/ejes', getEjesTematicos); //endpoint para mostrar todos los egals
postsRoutes.get('/posts/randompost', postAleatorio); //endpoint que muestra un post de forma aleatoria
postsRoutes.get('/posts/threerandompost', threerandompost); //endpoint que muestra un post de forma aleatoria








export default postsRoutes;   