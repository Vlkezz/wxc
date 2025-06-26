type StatusService = 'active' | 'deleted';
export interface Service {
    id:number
    name:string
    description:string
    price:number
    image:string
    status:StatusService
}