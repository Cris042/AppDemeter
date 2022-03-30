import bcrypt from 'bcrypt';
import { inject, injectable } from "tsyringe";
import { AppError } from "@shared/errors/AppError";
import { ICreatePicketDTO } from "../../dtos/ICreatePicketDTO";

import { IPicketRepository } from "../../repositories/IPicketRepository";

@injectable()
class CreateFarmsUseCase
{
  constructor
  (
    @inject("PicketRepository")
    private PicketRepository: IPicketRepository
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
    const picketAlreadyExists = await this.PicketRepository.findByName( name );

    if ( picketAlreadyExists ) 
    {
      throw new AppError("Picket already exists");
    }

    await this.PicketRepository.create({
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
