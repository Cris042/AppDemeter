import { Router } from "express";

const farmRoutes = Router();

farmRoutes.post( "/backup", ( req, res ) => 
{ 
    console.log( req.body.expensives );
});

export { farmRoutes };
