  import {
    Entity,
    Column,
    PrimaryColumn,
  } from 'typeorm';

  import { v4 as uuidV4 } from "uuid";
  @Entity('property')

  export default class Property
  {
    
      @PrimaryColumn()
      id: string;

      @Column()
      idUser: string;

      @Column()
      name: string;

      @Column()
      email: string;

      @Column()
      telephone: number;

      @Column()
      size: number;

      @Column()
      latitude: number;

      @Column()
      longitude: number;

      constructor() 
      {
          if (!this.id) 
          {
            this.id = uuidV4();
          }
      }

  }
