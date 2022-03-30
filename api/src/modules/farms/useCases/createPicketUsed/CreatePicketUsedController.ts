import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreatePicketUsedUseCase } from "./CreatePicketUsedUseCase";

class CreatePicketUsedController 
{
  async handle( request: Request, response: Response ): Promise<Response> 
  {

    for( var i = 0; i < request.body.expensivesPicketUsed.length; i++ )
    {
      const {  id, dateEntryPicket, dateExitPicket, picketID, cattleID,  occupancyRate } = request.body.expensivesPicketUsed[i];
      const createUserUseCase = container.resolve( CreatePicketUsedUseCase );

      await createUserUseCase.execute(
      {
          id,
          dateEntryPicket,
          dateExitPicket,
          picketID,
          cattleID,
          occupancyRate,
          
      });

    }
    
    return response.status(201).send();

  }
}

export { CreatePicketUsedController };
