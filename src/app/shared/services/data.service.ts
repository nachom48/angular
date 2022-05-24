import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Store } from "../interface/stores.interface.ts.service";
import { Details, DetailsOrder, Order } from "../interface/order.interface";

@Injectable({
  providedIn:'root'
})
export class DataService{
  private apiURL='http://localhost:3000';
  constructor(private http:HttpClient){}
  getStores():Observable<Store[]>{
    return this.http.get<Store[]>(`${this.apiURL}/stores`)
  }

  saveOrder(order:any):Observable<any>{
    return this.http.post<Order>(`${this.apiURL}/orders`,order);
      }

  saveDetailsOrder(details:DetailsOrder):Observable<any>{
    return this.http.post<DetailsOrder>(`${this.apiURL}/detailsOrders`,details);
  }


}
