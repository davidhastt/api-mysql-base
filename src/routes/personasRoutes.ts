import {Router} from 'express';
import {login, newUser, personasInfo, getPersonas, getPersona, updatePersona, deletePersona} from '../controllers/persona.controller';

const usersRoutes = Router();



usersRoutes.get('/personas', personasInfo);
usersRoutes.post('/personas/nueva', newUser);
usersRoutes.get('/personas/all', getPersonas);
usersRoutes.get('/personas/:id_persona', getPersona);
usersRoutes.put('/personas/:id_persona', updatePersona);
usersRoutes.delete('/personas/:id_persona', deletePersona);


usersRoutes.post('/personas/login', login);




export default usersRoutes;    