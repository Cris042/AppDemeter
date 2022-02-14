  import {
    Entity,
    Column,
    PrimaryColumn,
  } from 'typeorm';

  import { v4 as uuidV4 } from "uuid";
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

      constructor() 
      {
          if (!this.id) 
          {
            this.id = uuidV4();
          }
      }

  }
