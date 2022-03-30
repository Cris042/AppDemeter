import { getRepository, Repository } from "typeorm";
import { ICowRepository } from "../../../repositories/ICowRepository";
import { ICreateCowDTO } from "../../../dtos/ICreateCowDTO";
import { Cow } from "../entities/Cow";

class CowRepository implements ICowRepository
{
  private repository: Repository<Cow>;

  constructor() 
  {
    this.repository = getRepository( Cow );
  }

  async create
  ({
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
  }: ICreateCowDTO ): Promise<void> 
  {
    const cow = this.repository.create(
    {
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

    await this.repository.save( cow );
  }

  async findByName( name : string ): Promise<Cow> 
  {

     const cow = await this.repository.findOne( name );
     return cow;

  }

  async save( cow : Cow ): Promise<Cow> 
  {

     await this.repository.save( cow );    
     return cow;

  }
}

export { CowRepository };
