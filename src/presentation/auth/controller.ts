import { Request, Response } from 'express';
import { JwtAdapter } from '../../config/jwt.adapter';



export class AuthController {

    // DI
    constructor(
    ) { }


    loginUser = async (req: Request, res: Response) => {

        const usuario = req.body.usuario;
        const clave = req.body.clave;

        const token = await JwtAdapter.generateToken({ name: usuario,  });
        if ( !token ) {
            return res.status(500).json({
                ok: false,
                error: "Error interno",
                code:500
            });
        }
    
        return res.status(200).json({
            user: {
                usuario,
                clave
              },
              token: token,
        });
    }

    saludo = (req: Request, res: Response) => {

        const name = req.query.nombre;

        if(!name){
            return res.status(400).json({
                ok:false,
                error: 'Solicitud no valida, el nombre es obligatorio',
                errorCode: 400
            });
        }

        return res.status(200).json({
            ok:true,
            mensaje: `Hola ${name}`,
            error: "",
            code : 200
        })
    }
}