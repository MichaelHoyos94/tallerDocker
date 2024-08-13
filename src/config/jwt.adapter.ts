import jwt from 'jsonwebtoken';
import { envs } from './envs';



const JWT_SEED = envs.JWT_SEED;



export class JwtAdapter {

  // DI?

  static async generateToken(payload: any, duration: string = '1h') {
    return new Promise((resolve) => {
      jwt.sign(payload, JWT_SEED, {
        expiresIn: duration,
        issuer: 'ingesis.uniquindio.edu.co'
      }, (error, token) => {

        if (error) return resolve(null);

        resolve(token);
      })
    });
  }



  static validateToken<T>(token: string): Promise<T | null> {

    return new Promise((resolve) => {

      jwt.verify(token, JWT_SEED, (err, decoded) => {

        if (err) return resolve(null);

        resolve(decoded as T);

      });



    })
  }


}