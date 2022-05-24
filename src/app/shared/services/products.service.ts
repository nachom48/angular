import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../pages/products/interface/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiURL ='http://localhost:3000/products';
  //creo una propiedad privada q lo tipamos como HttpClient y lo importamos
  constructor(private http: HttpClient) { }

  //para hacer una peticion HTTP a uan url de un servidor
  //esto es como una promesa ,  se usa e lobservable para pedir los productos , una lista de la APIURl
    getProducts(): Observable<Product[]>{
    return this.http.get<Product[]>(this.apiURL);
  }

  updateStock(productId:number,stock:number):Observable<any>{
    //Como es metodo patch tengo q pasarle otro argumento
//creo el argumento como body y le doy el nombre de stock
    const body= {"stock":stock};
    return this.http.patch<any>(`${this.apiURL}/${productId}`,body)
  }
}

//un servicio es una capa q añadimos para manejar los datos, un servicio es un proveedor de datos, q mantiene logica de acceso y logica de negocio,los servicios seran consumidos por los componentes
// y tendran la resposnabilidad de acceder a la informacion y de manipularla

//Un observable es un flujo de datos en el tiempo, los observables representan una coleccion de futuros valores o data

