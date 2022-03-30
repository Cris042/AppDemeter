import bcrypt from 'bcrypt';
import { inject, injectable } from "tsyringe";
import { AppError } from "@shared/errors/AppError";
import { ICreatePicketUsedDTO } from "../../dtos/ICreatePicketUsedDTO";
import { IPicketUsedRepository } from "../../repositories/IPicketUsedRepository";

@injectable()
class CreatePicketUsedUseCase
{
  constructor
  (
    @inject("PicketUsedRepository")
    private PicketUsedRepository: IPicketUsedRepository
  ) {}

  async execute({
      id,
      dateEntryPicket,
      dateExitPicket,
      picketID,
      cattleID,
      occupancyRate,
  }: ICreatePicketUsedDTO ): Promise<void> 
  {
   
    const picketAlreadyExists = await this.PicketUsedRepository.findById( id );

    if ( picketAlreadyExists ) 
    {
      throw new AppError("Picket already exists");
    }

    await this.PicketUsedRepository.create({
      id,
      dateEntryPicket,
      dateExitPicket,
      picketID,
      cattleID,
      occupancyRate,
    });

  }
}

export { CreatePicketUsedUseCase };
