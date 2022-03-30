import { Request, Router } from "express";
import { CreatePicketUsedController } from "@modules/farms/useCases/createPicketUsed/CreatePicketUsedController";

const picketUsed = Router();
const createPicketUsedController = new CreatePicketUsedController();

picketUsed.post( "/backup", ( request, response ) => 
{      
    createPicketUsedController.handle( request , response );
});

export { picketUsed };
