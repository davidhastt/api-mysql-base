import {Request, Response} from 'express';
import {connect} from '../database';
import {Respuesta} from  '../interfaces/Respuesta';


export const getInfo=async(req:Request, res:Response):Promise<Response>=>{

    let url = req.protocol + '://' + req.get('host') + req.originalUrl;

        //esto es lo que aparece en el  navegador
        return res.status(200).json({
            "mensaje":"Bienvenido; a continuacion se muestra en formato JSON el menu de endpoints disponibles",
            "status":200,
            "endpoints":[
                {"pruebaConexion":`${url}pruebaConexion`},
                {"personas":`${url}personas/`},                

            ]
        });     
}



export async function  pruebaConexionDB(req:Request, res: Response):Promise<Response>{
    
    //console.log(id);
    const conn = await connect();
    let respuesta:Respuesta={"code":200, "status":"success", "message":""};
    try {     
    const fechaHora = await conn.query('SELECT NOW();');
    respuesta.message=fechaHora[0];
    return res.json(respuesta);

    } catch (error) {
        console.error(error);
        respuesta.code=500;
        respuesta.status="error";
        respuesta.message="Error en el servidor NodeJS";
        //res.status(500).json(respuesta);
        return res.json(respuesta);  
    } finally {
        conn.end();
        //return res.json(respuesta);
    }      

}


	