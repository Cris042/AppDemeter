import { container } from "tsyringe";
import { Request, Response } from "express";
import { CreateCowUseCase } from "../../cow/useCases/CreateCowUseCase";

class CreateCowController 
{
  async handle( request: Request, response: Response ): Promise<Response> 
  {
    
    for( var i = 0; i < request.body.expensivesCattle.length; i++ )
    {

      const { id, id_user, breed, name, sex, node, matriz, earring, status, initialWeight, weight,purchaseValue, datePurchase, age  } = request.body.expensivesCattle[i];
      const createUserUseCase = container.resolve( CreateCowUseCase );

      await createUserUseCase.execute(
      {
          id,
          idUser : id_user,
          breed,   
          name,
          sexo : sex,
          node, 
          matriz, 
          brinco : earring,
          status,  
          initialWeight,
          Weight : weight,
          purchaseValue, 
          datePurchase,
          dateOfBirth : age,
      });
      
    }
    
    return response.status(201).send();

  }
}

export { CreateCowController };
