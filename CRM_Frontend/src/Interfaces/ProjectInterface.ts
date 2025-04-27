

export interface IProject {
    
    title: string;
    budget: number;
    deadline: string; // ISO date string
    status: "DRAFT"|"CANCELLED"|"COMPLETED"|"IN_PROGRESS"|"NEGOTIATION"|"ON_HOLD"|"PROPOSAL_SENT"|"WAITING_ON_CLIENT" 
    client_id: string;
    client:{
      name:string
    }

  }
export interface IAddProject extends IProject{
  clientEmail:string
}
export interface IProjectUpdate extends IProject{
    project_id:string,

}
  