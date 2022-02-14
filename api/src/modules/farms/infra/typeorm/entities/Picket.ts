  import {
    Entity,
    Column,
    PrimaryColumn,
  } from 'typeorm';

  import { v4 as uuidV4 } from "uuid";
  @Entity('picket')

  export default class Picket
  {
         
      @PrimaryColumn()
      id: string;

      @Column()
      id_user: string;

      @Column()
      name: string;

      @Column()
      countFood: number;

      @Column()
      type: string;

      @Column()
      size: number;

      @Column()
      latitude: number;

      @Column()
      longitude: number;

      @Column()
      status: number;

      constructor() 
      {
          if (!this.id) 
          {
            this.id = uuidV4();
          }
      }

  }

  export { Picket };
