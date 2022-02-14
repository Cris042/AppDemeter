import { ICreatePicketDTO } from "../dtos/ICreatePicketDTO";
import { Picket } from "../infra/typeorm/entities/Picket";

interface IPicketRepository 
{
  create( data: ICreatePicketDTO ): Promise<void>;
  save( picket: Picket ): Promise<Picket>;
  findByName( name: string ): Promise<Picket>;
}

export { IPicketRepository  };
