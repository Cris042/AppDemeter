import {
    Entity,
    Column,
    PrimaryColumn,
} from 'typeorm';

import { v4 as uuidV4 } from "uuid";
@Entity('vaccine')

export default class Vaccine
{
    
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    doses: number;

    @Column()
    dosesTime: number;

    @Column()
    timeEffective: number;

    constructor() 
    {
        if (!this.id) 
        {
          this.id = uuidV4();
        }
    }

}
