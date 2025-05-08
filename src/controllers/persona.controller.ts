// src/routes/auth.ts
import { Request, Response } from 'express';
import {connect} from '../database'
import { Persona } from '../interfaces/Persona';
import jwt, { Secret } from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { Respuesta } from '../interfaces/Respuesta';



export async function login(req: Request, res: Response){
  const { correo, password } = req.body;
  //console.log(email, password);
  const conn = await  connect();
  const personasData: any= await  conn.query('SELECT * FROM personas WHERE correo = ?', [correo]);
  const persona: Persona[]=personasData[0];

  if (persona.length===0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }else{
      const isPasswordValid = await bcrypt.compare(password, persona[0].password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Contraseña incorrecta' });
      }
      const jwt_secret: Secret  | undefined = process.env.JWT_SECRET;   

      if (!jwt_secret) {
        return res.status(500).json({
          "message": "Error interno del servidor, clave secreta no definida.",
          "status": 500,
        });
    }
      

      const token = jwt.sign(persona[0], jwt_secret, { expiresIn: '1h' }); 
      const respuesta:Respuesta={"code":200, "status":"success", "message":{"Authorization":token}}
      res.json( respuesta );
    }
  
}



export async function  deletePersona(req:Request, res: Response):Promise<Response>{//proteger ruta
  const id_persona=  req.params.id_persona;
  const conn = await connect();
  console.log("id_persona", id_persona);

  let respuesta:Respuesta={"code":200, "status":"success", "message":""};
  try {
      const personaData: any= await conn.query('DELETE FROM personas  WHERE id_persona = ?', [id_persona]);
      respuesta.message="Persona borrada";
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



export async function  updatePersona(req:Request, res: Response):Promise<Response>{//proteger ruta
    const id_persona=  req.params.id_persona;
    const person:Persona = req.body;
    const conn = await connect();
    
    let respuesta:Respuesta={"code":200, "status":"success", "message":""};
    try {        
        const personaData: any= await conn.query('UPDATE personas SET ? WHERE id_persona = ?', [person, id_persona]);
        if (personaData[0].changedRows>0){
            respuesta.message="Persona actualizada";
        }else{            
            respuesta.message="Peticion correcta, pero no se pudo actualizar, persona no encontrada";
            respuesta.status="error";
            respuesta.code=401;
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



export async function  getPersona(req:Request, res: Response):Promise<Response>{
    
  const id_persona =  req.params.id_persona;
 //console.log(id);
  const conn = await connect();
  let respuesta:Respuesta={"code":200, "status":"success", "message":""};
  try {     
  const personas = await conn.query('SELECT id_persona, nombre, apaterno, amaterno, fechaNac, telefono, correo, fecha_registro FROM personas WHERE id_persona = ?', [id_persona])
  return res.json(personas[0]);
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




export async function newUser(req: Request, res: Response){
  

  const persona:Persona= req.body;
  const conn = await connect();
  const hashedPassword:string = await bcrypt.hash(persona.password, 10);
  persona.password=hashedPassword;
  

  try {
    await conn.query('INSERT INTO personas SET ?', [persona]);
    const respuesta:Respuesta={"code":200, "status":"success", "message":"Persona creada"}
    return res.json(respuesta);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en el servidor' });
  } finally {
    conn.end();
  }
}


export async  function getPersonas(req: Request, res: Response): Promise<Response>{
  
  const conn = await  connect();
  let respuesta:Respuesta={"code":200, "status":"success", "message":""};
  try { 
      const personas = await  conn.query('SELECT id_persona, rol, nombre, apaterno, amaterno, fechaNac, telefono, correo, fecha_registro FROM personas');
      respuesta.message="Consulta realizada con exito";
      return res.json(personas[0]);
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




export async function personasInfo(req: Request, res: Response){
  let url = req.protocol + '://' + req.get('host') + req.originalUrl;

  //esto es lo que aparece en el  navegador
  return res.status(200).json({
      "mensaje":"Bienvenido; a continuacion se muestra en formato JSON el menu de endpoints disponibles para personas",
      "status":200,
      "endpoints":[
        {"crear personas":`${url}nueva`},
          {"obtener personas":`${url}all`},
          {"obtener persona":`${url}id`},
      ]
  }); 
}
