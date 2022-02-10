import {
    Entity,
    Column,
    PrimaryColumn,
  } from 'typeorm';

  @Entity('vaccineReport')

  export default class VaccineReport
  {

      @PrimaryColumn()
      id: string;

      @Column()
      dateApplication: string;

      @Column()
      vaccineID: number;

      @Column()
      cattleID: number;

  }
