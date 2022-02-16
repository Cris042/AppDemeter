import { Request, Router } from "express";
import { CreateFarmsController } from "@modules/farms/useCases/createFarms/CreateFarmsController";

const farmRoutes = Router();
const createFarmsController = new CreateFarmsController();

farmRoutes.post( "/backup", ( request, response ) => 
{      
    createFarmsController.handle( request , response );
});

export { farmRoutes };
