import { Request, Response } from "express";
import { container } from "tsyringe";
import { SyncUserUseCase } from "./SyncUserUseCase";

class SyncUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { user_id, name,  avatar } = request.body.updated[0];
    
    console.log("PUSH DO USUÁRIO")    
    console.log(request.body.updated[0]);

    const syncUserUseCase = container.resolve(SyncUserUseCase);
    const user = await syncUserUseCase.execute({
      id: user_id,
      name: name,      
      avatar: avatar
    });
  
    return response.status(201).json(user);
  }
}

export { SyncUserController };
