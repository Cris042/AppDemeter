import { Router } from "express";
import { CreateFarmsController } from "@modules/farms/useCases/createFarms/CreateFarmsController";

const farmRoutes = Router();

const createFarmsController = new CreateFarmsController();
// farmRoutes.post( "/backup", createFarmsController.handle );

farmRoutes.post( "/backup", ( req, res ) => 
{  
    req.body.expensives.forEach ( element => 
    {       
        //createFarmsController.handle( element, res );
        console.log( element );
    }); 

});

export { farmRoutes };
