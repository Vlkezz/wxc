export interface OrderResponse {
  id: number;               
  status: string;           
  dateCreated: string;      
  dateFormed: string | null;       
  dateFinished: string | null;     
  creator: number;          
  creator_username: string; 
  moderator: number | null ;        
  moderator_username: string | null ; 
}