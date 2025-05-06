import {Router} from 'express';
import {login} from '../controllers/persona.controller';
import {newUser, personasInfo} from '../controllers/persona.controller';

const usersRoutes = Router();



usersRoutes.get('/personas', personasInfo);



usersRoutes.post('/personas/nueva', newUser);


usersRoutes.route('/login')
    .post(login)



export default usersRoutes;    