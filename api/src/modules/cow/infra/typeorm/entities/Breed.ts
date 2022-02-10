import {
  Entity,
  Column,
  PrimaryColumn,
} from 'typeorm';


  @Entity('breed')

  export default class Breed
  {

      @PrimaryColumn()
      id: string;

      @Column()
      name: string;

      @Column()
      consumption: number;

   }
