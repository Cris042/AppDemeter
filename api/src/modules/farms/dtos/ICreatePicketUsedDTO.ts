interface ICreatePicketUsedDTO 
{
   id?: string;
   dateEntryPicket: String;
   dateExitPicket: String;
   picketID: String;
   cattleID: string;
   occupancyRate: number;   
}
  
export { ICreatePicketUsedDTO };