import { Request, Router } from "express";
import { CreateCowController } from "@modules/cow/useCases/CreateCowController";

const cowRoutes = Router();
const createCowController = new CreateCowController();

cowRoutes.post( "/backup", ( request, response ) => 
{      
    createCowController.handle( request , response );
});

export { cowRoutes };