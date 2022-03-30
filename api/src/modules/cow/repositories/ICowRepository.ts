import { ICreateCowDTO } from "../dtos/ICreateCowDTO";
import { Cow } from "../infra/typeorm/entities/Cow";

interface ICowRepository 
{
  create( data: ICreateCowDTO ): Promise<void>;
  save( picket: Cow ): Promise<Cow>;
  findByName( name: string ): Promise<Cow>;
}

export { ICowRepository };
