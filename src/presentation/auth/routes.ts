import { Router } from 'express';
import { AuthController } from './controller';
import { AuthMiddleware } from '../middlewares/auth.middleware';

export class AuthRoutes {

  static get routes(): Router {

    const router = Router();
    // const authService = new AuthService();

    const controller = new AuthController();
    
    // Definir las rutas
    router.get('/saludo', [ AuthMiddleware.validateJWT ], controller.saludo);
    
    router.post('/login', controller.loginUser );

    return router;
  }

}

