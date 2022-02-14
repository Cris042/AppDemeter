  import {
    Entity,
    Column,
    PrimaryColumn,
  } from 'typeorm';

  import { v4 as uuidV4 } from "uuid";
  @Entity('breed')

  export default class Breed
  {
    
      @PrimaryColumn()
      id: string;

      @Column()
      name: string;

      @Column()
      consumption: number;

      constructor() 
      {
          if (!this.id) 
          {
            this.id = uuidV4();
          }
      }

   }
