import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateFarmsUseCase } from "../../useCases/createFarms/CreateFarmsUseCase";

class CreateFarmsController 
{
  async handle( request: Request, response: Response ): Promise<Response> 
  {
    const { name, countFood, type, size, latitude, longitude, status, id, id_user } = request.body;
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

    return response.status(201).send();
  }
}

export { CreateFarmsController };
