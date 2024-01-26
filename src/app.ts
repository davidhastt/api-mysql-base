//definimos el servidor

import express, {Application} from 'express';
import morgan from 'morgan'
import IndexRoutes  from './routes/index.route'
import PostsRoutes  from './routes/posts.routes'


export class App{
	private app: Application;

	constructor(private port: number | string){
	this.app=express();
    this.settings();
    this.middlewares();
    this.routes();
    }

    settings(){
        this.app.set('port', this.port || process.env.PORT || 3000)
    }


    routes(){
        this.app.use(IndexRoutes);
        this.app.use('/posts', PostsRoutes);
    }

    middlewares(){
        this.app.use(morgan('dev'));
        //this.app.use(express.urlencoded({extended:false}));//esto es para recibir formularios)
        this.app.use(express.json())
    }


    async listen(){
         await this.app.listen(this.app.get('port'));
         console.log('Servidor en puerto', this.app.get('port'));
    }


}