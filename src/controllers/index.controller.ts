import {Request, Response} from 'express'


export function indexWelcome(req: Request, res: Response): Response{
	return	res.json('Bienvenido a mi api2')
}