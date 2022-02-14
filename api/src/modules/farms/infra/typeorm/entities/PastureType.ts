import {
  Entity,
  Column,
  PrimaryColumn,
} from 'typeorm';
  
import { v4 as uuidV4 } from "uuid";
@Entity('pastureType')

export default class PastureType
{

    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    amountOffood: number;

    constructor() 
    {
        if (!this.id) 
        {
          this.id = uuidV4();
        }
    }

 }
