// src/routes/auth.ts
import { Request, Response } from 'express';
import {connect} from '../database'
import { Persona } from '../interfaces/Persona';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { Respuesta } from '../interfaces/Respuesta';


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
      const productos = await  conn.query('SELECT * FROM personas');
      respuesta.message="Consulta realizada con exito";
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


export async function personasInfo(req: Request, res: Response){
  let url = req.protocol + '://' + req.get('host') + req.originalUrl;

  //esto es lo que aparece en el  navegador
  return res.status(200).json({
      "mensaje":"Bienvenido; a continuacion se muestra en formato JSON el menu de endpoints disponibles para personas",
      "status":200,
      "endpoints":[
          {"obtener personas":`${url}getpersonas`},
          {"obtener personas":`${url}nueva`}
      ]
  }); 
}



export async function login(req: Request, res: Response){
    const { email, password } = req.body;
    //console.log(email, password);
    const conn = await  connect();
    const personasData: any= await  conn.query('SELECT * FROM personas WHERE email = ?', [email]);
    const persona: Persona[]=personasData[0];

    if (persona.length===0) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }else{
        const isPasswordValid = await bcrypt.compare(password, persona[0].password);
        if (!isPasswordValid) {
          return res.status(401).json({ error: 'Contraseña incorrecta' });
        }
        persona[0].password="234+´{9573-.,|}|°"; //inventamos un password
        const token = jwt.sign(persona[0], 'mexiqueñ', { expiresIn: '1h' }); //tienes que meter el secret key en una variable de entorno
        const respuesta:Respuesta={"code":200, "status":"success", "message":{"Authorization":token}}
        res.json( respuesta );
      }
    
}