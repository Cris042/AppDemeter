interface IPicketResponseDTO 
{
    name: string;
    countFood: number;
    type: string;
    size: number;
    latitude:  number;
    longitude: number;
    status: number;
    id?: string;
}
  
export { IPicketResponseDTO };