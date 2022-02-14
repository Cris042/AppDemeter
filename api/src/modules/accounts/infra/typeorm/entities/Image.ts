  import {
    Entity,
    Column,
    PrimaryColumn,
  } from 'typeorm';
  
  import { v4 as uuidV4 } from "uuid";
  @Entity('images')

  export default class Image 
  {
      @PrimaryColumn()
      id: string;

      @Column()
      idUser: string;

      @Column()
      path: string;

      @Column()
      propertyID: number;

      constructor() 
      {
          if (!this.id) 
          {
            this.id = uuidV4();
          }
      }
  }
  