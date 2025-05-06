//definimos el servidor

import express, {Application} from 'express';
import morgan from 'morgan'
import InfoRoutes  from './routes/info.route'
//import productosRoutes  from './routes/productos.routes'
import personasRoutes from './routes/personasRoutes'



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

    middlewares(){
        this.app.use(morgan('dev'));
        //this.app.use(express.urlencoded({extended:false}));//esto es para recibir formularios)
        this.app.use(express.json())
    }

    routes(){
        this.app.use(InfoRoutes);
        this.app.use(personasRoutes);
        //this.app.use('/productos', productosRoutes);        
    }

    async listen(){
         await this.app.listen(this.app.get('port'));
         console.log('Servidor en puerto', this.app.get('port'));
    }


}