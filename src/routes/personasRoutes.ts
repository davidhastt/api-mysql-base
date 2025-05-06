import {Router} from 'express';
import {login, newUser, personasInfo, getPersonas, getPersona, updatePersona} from '../controllers/persona.controller';

const usersRoutes = Router();



usersRoutes.get('/personas', personasInfo);
usersRoutes.post('/personas/nueva', newUser);
usersRoutes.get('/personas/all', getPersonas);
usersRoutes.get('/personas/:id_persona', getPersona);
usersRoutes.put('/personas/:id_persona', updatePersona);


usersRoutes.route('/login')
    .post(login)



export default usersRoutes;    