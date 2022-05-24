export interface Details{
  productId: number;
  productName:string;
  quantity:number;
}
export interface Order{
  name:String;
  shippingAddress:string;
  city:string;
  date:string;
  isDelivery:boolean;
  id:number;
}

export interface DetailsOrder{
  details:Details[];
  orderId:number;
  id?:number;
}

