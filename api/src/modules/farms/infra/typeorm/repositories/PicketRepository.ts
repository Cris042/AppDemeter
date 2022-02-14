import { getRepository, Repository } from "typeorm";
import { IPicketRepository } from "../../../repositories/IPicketRepository";
import { ICreatePicketDTO } from "../../../dtos/ICreatePicketDTO";
import { Picket } from "../entities/Picket";

class PicketRepository implements IPicketRepository 
{
  private repository: Repository<Picket>;

  constructor() 
  {
    this.repository = getRepository( Picket );
  }

  async create
  ({
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
    const picket = this.repository.create(
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

    await this.repository.save( picket );
  }

  async findById( id : string ): Promise<Picket> 
  {

     const picket = await this.repository.findOne( id );
     return picket;

  }

  async save( picket : Picket ): Promise<Picket> 
  {

     await this.repository.save( picket );    
     return picket;

  }
}

export { PicketRepository };
