import { inject, injectable } from "tsyringe";
import bcrypt from 'bcrypt';
import { AppError } from "@shared/errors/AppError";
import { ICreatePicketDTO } from "../../dtos/ICreatePicketDTO";

import { IPicketRepository } from "../../repositories/IPicketRepository";

@injectable()
class CreateFarmsUseCase
{
  constructor
  (
    @inject("PicketRepository")
    private usersRepository: IPicketRepository
  ) {}

  async execute({
    name,
    countFood,
    type,
    size,
    latitude,
    longitude,
    status,
    id,
    id_user,
  }: ICreatePicketDTO ): Promise<void> 
  {
    const userAlreadyExists = await this.usersRepository.findById( id );

    if ( userAlreadyExists ) 
    {
      throw new AppError("Picket already exists");
    }

    await this.usersRepository.create({
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
}

export { CreateFarmsUseCase };
