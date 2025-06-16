export interface OrderServiceData {
  order: number;
  services: number[];
}

export interface OrderServiceResponce {
  id:number;
  order: number;
  service: number;
  service_name: string;
}