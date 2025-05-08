import {Router} from 'express';
import {login, newUser, personasInfo, getPersonas, getPersona, updatePersona, deletePersona} from '../controllers/persona.controller';
import { authMiddleware } from '../middlewares/auth.middlewares';
const usersRoutes = Router();



usersRoutes.get('/personas', personasInfo);
usersRoutes.post('/personas/nueva', newUser);
usersRoutes.get('/personas/all', authMiddleware, getPersonas);
usersRoutes.get('/personas/:id_persona', authMiddleware, getPersona);
usersRoutes.put('/personas/:id_persona', authMiddleware, updatePersona);
usersRoutes.delete('/personas/:id_persona', authMiddleware, deletePersona);


usersRoutes.post('/personas/login', login);




export default usersRoutes;    