interface ICreatePicketDTO 
{
    name: string;
    countFood: number;
    type: string;
    size: number;
    latitude:  number;
    longitude: number;
    status: number;
    id?: string;
    id_user?: string;
}
  
export { ICreatePicketDTO };
  