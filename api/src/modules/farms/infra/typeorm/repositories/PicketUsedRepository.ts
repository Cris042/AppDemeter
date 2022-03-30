import { getRepository, Repository } from "typeorm";
import { IPicketUsedRepository } from "../../../repositories/IPicketUsedRepository";
import { ICreatePicketUsedDTO } from "../../../dtos/ICreatePicketUsedDTO";
import { PicketUsed } from "../entities/PicketUsed";

class PicketUsedRepository implements IPicketUsedRepository
{
  private repository: Repository<PicketUsed>;

  constructor() 
  {
    this.repository = getRepository( PicketUsed );
  }

  async create
  ({
     id,
     dateEntryPicket,
     dateExitPicket,
     cattleID,
     occupancyRate,

  }:  ICreatePicketUsedDTO ): Promise<void> 
  {
    const picketUsed = this.repository.create(
    {
        id,
        dateEntryPicket,
        dateExitPicket,
        cattleID,
        occupancyRate,

    });

    await this.repository.save( picketUsed );
  }

  async findById( id : string ): Promise<PicketUsed> 
  {

     const picketUsed = await this.repository.findOne( id );
     return picketUsed;

  }

  async save( picketUsed : PicketUsed ): Promise<PicketUsed> 
  {

     await this.repository.save( picketUsed );    
     return picketUsed;

  }
}

export { PicketUsedRepository };
