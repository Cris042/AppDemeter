import { ICreatePicketUsedDTO } from "../dtos/ICreatePicketUsedDTO";
import { PicketUsed } from "../infra/typeorm/entities/PicketUsed";

interface IPicketUsedRepository 
{
  create( data: ICreatePicketUsedDTO ): Promise<void>;
  save( picket: PicketUsed ): Promise<PicketUsed>;
  findById( id : string ): Promise<PicketUsed>;
}

export { IPicketUsedRepository };
