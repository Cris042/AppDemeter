  import {
    Entity,
    Column,
    PrimaryColumn,
  } from 'typeorm';

  import { v4 as uuidV4 } from "uuid";
   @Entity('picketUsed')

  export default class PicketUsed
  {

      @PrimaryColumn()
      id: string;

      @Column()
      dateEntryPicket: String;

      @Column()
      dateExitPicket: String;

      @Column()
      picketID: String;

      @Column( )
      cattleID: string;

      @Column()
      occupancyRate: number;

      constructor() 
      {
          if (!this.id) 
          {
            this.id = uuidV4();
          }
      }
  }
