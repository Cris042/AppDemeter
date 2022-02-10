  import {
    Entity,
    Column,
    PrimaryColumn,
  } from 'typeorm';

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

  }
