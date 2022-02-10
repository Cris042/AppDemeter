  import {
    Entity,
    Column,
    PrimaryColumn,
  } from 'typeorm';
  
  
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
  }
  