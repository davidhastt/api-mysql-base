import {Request, Response} from 'express'
import {connect} from '../database'
import { Producto } from '../interfaces/Producto';
import { Respuesta } from '../interfaces/Respuesta';
import 'dotenv/config'
import dotenv from 'dotenv';


export async  function threerandompost(req: Request, res: Response): Promise<Response>{
    const conn = await  connect();
    let respuesta:Respuesta={"code":200, "status":"success", "message":""};
    try { 
        const productos = await  conn.query('SELECT * FROM archivos WHERE titulo IS NOT NULL ORDER BY RAND() LIMIT 3;');
        respuesta.message="Consulta realizada con exito";
        return res.json(productos[0]);
    } catch (error) {
        console.error(error);
        respuesta.message="Error en el servidor NodeJS";
        respuesta.status="error";
        respuesta.code=500;
        res.status(500).json(respuesta);
        return res.json(respuesta);
    } finally {
        conn.end();
        //return res.json(respuesta);
    }     
}



export async  function postAleatorio(req: Request, res: Response): Promise<Response>{
    const conn = await  connect();
    let respuesta:Respuesta={"code":200, "status":"success", "message":""};
    try { 
        const productos = await  conn.query('SELECT * FROM archivos WHERE titulo IS NOT NULL ORDER BY RAND() LIMIT 1;');
        respuesta.message="Consulta realizada con exito";
        return res.json(productos[0]);
    } catch (error) {
        console.error(error);
        respuesta.message="Error en el servidor NodeJS";
        respuesta.status="error";
        respuesta.code=500;
        res.status(500).json(respuesta);
        return res.json(respuesta);
    } finally {
        conn.end();
        //return res.json(respuesta);
    }     
}



export async  function getEjesTematicos(req: Request, res: Response): Promise<Response>{
    const conn = await  connect();
    let respuesta:Respuesta={"code":200, "status":"success", "message":""};
    try { 
        const productos = await  conn.query('SELECT DISTINCT id_tema, nom_tema FROM temas;');
        respuesta.message="Consulta realizada con exito";
        return res.json(productos[0]);
    } catch (error) {
        console.error(error);
        respuesta.message="Error en el servidor NodeJS";
        respuesta.status="error";
        respuesta.code=500;
        res.status(500).json(respuesta);
        return res.json(respuesta);
    } finally {
        conn.end();
        //return res.json(respuesta);
    }     
}




export async  function getEgals(req: Request, res: Response): Promise<Response>{
    const conn = await  connect();
    let respuesta:Respuesta={"code":200, "status":"success", "message":""};
    try { 
        const productos = await  conn.query('SELECT DISTINCT id_egal FROM archivos;');
        respuesta.message="Consulta realizada con exito";
        return res.json(productos[0]);
    } catch (error) {
        console.error(error);
        respuesta.message="Error en el servidor NodeJS";
        respuesta.status="error";
        respuesta.code=500;
        res.status(500).json(respuesta);
        return res.json(respuesta);
    } finally {
        conn.end();
        //return res.json(respuesta);
    }     
}




export async function  createProducto(req:Request, res: Response){//proteger ruta
    const newProducto:Producto = req.body;
    const conn = await connect();
    let respuesta:Respuesta={"code":200, "status":"success", "message":""}; 
    dotenv.config();
    console.log(process.env.secret_JWT);
    

/*
    const NODE_ENV = process.env.NODE_ENV || 'development';
    dotenv.config(
        {path:`.env${process.env.NODE_ENV}`}
    );
    //console.log(process.env.NODE_ENV);
    
    console.log(process.env.secret_JWT);
*/
    try {    
        await conn.query('INSERT INTO productos SET ?', [newProducto]);  
        respuesta.message="Producto creado satisfactoriamente";
        return res.json(respuesta);
    } catch (error) {
        console.error(error);
        respuesta.message="Error en el servidor NodeJS";
        res.status(500).json(respuesta);
    } finally {
        conn.end();
    } 
}


export async function  updateProducto(req:Request, res: Response):Promise<Response>{//proteger ruta
    const id_producto=  req.params.id_producto;
    const producto:Producto = req.body;
    const conn = await connect();
    
    let respuesta:Respuesta={"code":200, "status":"success", "message":""};
    try {        
        const productoData: any= await conn.query('UPDATE productos SET ? WHERE id_producto = ?', [producto, id_producto]);
        if (productoData[0].changedRows>0){
            respuesta.message="Producto actualizado";
        }else{            
            respuesta.message="Peticion correcta, pero no se pudo actualizar, producto no encontrado";
            respuesta.code=200;
            //res.status(200).json(respuesta);
        }

    } catch (error) {
        console.error(error);
        respuesta.message="Error en el servidor NodeJS";
        res.status(500).json(respuesta);
        //return res.json(respuesta);  
    } finally {
        conn.end();
        return res.json(respuesta);

    } 

}







export async function  getProducto(req:Request, res: Response):Promise<Response>{
    const id=  req.params.id_producto;
    //console.log(id);
    const conn = await connect();
    let respuesta:Respuesta={"code":200, "status":"success", "message":""};
    try {     
    const productos = await conn.query('SELECT * FROM productos WHERE id_producto = ?', [id])
    return res.json(productos[0]);
    } catch (error) {
        console.error(error);
        respuesta.message="Error en el servidor NodeJS";
        res.status(500).json(respuesta);
        return res.json(respuesta);  
    } finally {
        conn.end();
        //return res.json(respuesta);
    }      

}