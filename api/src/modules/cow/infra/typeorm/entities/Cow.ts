  import {
    Entity,
    Column,
    PrimaryColumn,
  } from 'typeorm';

  @Entity('cow')

  export default class Cow
  {
    
      @PrimaryColumn()
      id: string;

      @Column()
      idUser: string;
      
      @Column()
      breed: string;   

      @Column()
      name: string;   

      @Column()
      sexo: string; 

      @Column()
      node: string; 

      @Column()
      matriz: number; 
      
      @Column()
      brinco: number;  

      @Column()
      status: string;    

      @Column()
      initialWeight: number;  

      @Column()
      Weight: number; 

      @Column()
      purchaseValue: number; 
      
      @Column()
      datePurchase: String; 

      @Column()
      dateOfBirth: String;

  }
