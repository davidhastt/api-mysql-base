import {Router} from 'express';
import {login} from '../controllers/user.controller'
import {newUser} from '../controllers/user.controller'

const usersRoutes = Router();

usersRoutes.route('/')
    .post(newUser)



usersRoutes.route('/login')
    .post(login)



export default usersRoutes;    