interface ICreateCowDTO 
{
    id?: string;
    idUser: string;
    breed: string;   
    name: string;   
    sexo: string;
    node: string; 
    matriz: number; 
    brinco: number;  
    status: string;    
    initialWeight: number;  
    Weight: number;
    purchaseValue: number; 
    datePurchase: String; 
    dateOfBirth: String;
}
  
export { ICreateCowDTO  };
  
