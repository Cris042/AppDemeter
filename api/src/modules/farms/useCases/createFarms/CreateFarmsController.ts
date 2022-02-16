import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateFarmsUseCase } from "../../useCases/createFarms/CreateFarmsUseCase";

class CreateFarmsController 
{
  async handle( request: Request, response: Response ): Promise<Response> 
  {
    for( var i = 0; i < request.body.expensives.length; i++ )
    {
      const { name, countFood, type, size, latitude, longitude, status, id, id_user } = request.body.expensives[i];
      const createUserUseCase = container.resolve( CreateFarmsUseCase );

      await createUserUseCase.execute(
      {
          name,
          countFood,
          type,
          size,
          latitude,
          longitude,
          status,
          id,
          id_user,
      });
    }

    return response.status(201).send();
  }
}

export { CreateFarmsController };
