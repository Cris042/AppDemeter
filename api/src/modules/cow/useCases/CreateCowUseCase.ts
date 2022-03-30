import bcrypt from 'bcrypt';
import { inject, injectable } from "tsyringe";
import { AppError } from "@shared/errors/AppError";
import { ICreateCowDTO } from "../../cow/dtos/ICreateCowDTO";
import { ICowRepository } from "../repositories/ICowRepository";

@injectable()
class CreateCowUseCase
{
  constructor
  (
    @inject("CowRepository")
    private CowRepository: ICowRepository
  ) {}

  async execute({
    id,
    idUser,
    breed,   
    name,
    sexo,
    node, 
    matriz, 
    brinco,
    status,  
    initialWeight,
    Weight,
    purchaseValue, 
    datePurchase,
    dateOfBirth,
  }: ICreateCowDTO  ): Promise<void> 
  {
    const cowAlreadyExists = await this.CowRepository.findByName( name );

    if ( cowAlreadyExists ) 
    {
      throw new AppError("Cow already exists");
    }

    await this.CowRepository.create({
      id,
      idUser,
      breed,   
      name,
      sexo,
      node, 
      matriz, 
      brinco,
      status,  
      initialWeight,
      Weight,
      purchaseValue, 
      datePurchase,
      dateOfBirth,
    });

  }
}

export { CreateCowUseCase };
