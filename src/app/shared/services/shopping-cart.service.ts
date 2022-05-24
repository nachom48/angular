
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Product } from 'src/app/pages/products/interface/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  products: Product[] = []
  // aca llamo a la interface de product y creo un array  y lo inicializo vacio por eso el = [],ahi guardo todso los productos q se añadan al carrito
  private cartSubject = new BehaviorSubject<Product[]>([]);
  private totalSubject = new BehaviorSubject<number>(0);
  private quantitySubject = new BehaviorSubject<number>(0);
// siempre cuando instanciamos un observable en este caso subject tenemosq decirle de q tipo es lo q observa,
//nos devuelven un observable de los valores que iniciamos arriba
  get totalAction$():Observable<number>{
    return this.totalSubject.asObservable();
  }
  get quantityAction$():Observable<number>{
    return this.quantitySubject.asObservable();
  }
  get cartAction$():Observable<Product[]>{
    return this.cartSubject.asObservable();
  }
  //aca el getter tiene qt ener el return si o si,y cuando seh abla de observables la convencion es agregarle $

  // Aca creamos el metodo para q desde nuestro componente invoque este metodo y no lo otros q son privados
  updateCart(product:Product):void{
      this.addToCart(product);
      this.calcQuantity();
      this.calcTotal();
    }
  private calcTotal():void{
    const total=this.products.reduce((acc,prod)=> acc+=(prod.price)*prod.qty,0)
    // aca tengo q hacer un reduce q agarra un acumulable(acc) y le suma del producto el precio y el valor inicial es 0
    this.totalSubject.next(total);
    // Con el metodo .next le guardo al observable de total el valor q tiene el carrito
  }
  private calcQuantity():void{
    const quantity=this.products.reduce((acc,prod)=> acc+=prod.qty,0)
    // aca le guardo la longitud del array product q es la cantidd de productos q hay
    this.quantitySubject.next(quantity);
    // Con el metodo .next le guardo al observable de total el valor q tiene el carrito

  }
  private addToCart(product : Product):void{
    // Buscamos si el producto esta en el cart
    const isProductInCart=this.products.find(({id})=>id===product.id)
    // En caso de que este aumentamos la cantidad en 1
     if (isProductInCart){
       isProductInCart.qty +=1;
     }
    //  Si no esta lo añadimos y le metemos la propiedad quantity
     else{
       this.products.push({...product, qty:1})
     }
  this.cartSubject.next(this.products);
    // Con el metodo .next le guardo al observable de total el valor q tiene el carrito

  }
  resetCart():void{
    // Aca reseteo el carrito , con el el subjeect se debe usar el metodo next y ahi le seteo el valor de 0 y de array Vacio
    this.cartSubject.next([]);
    this.totalSubject.next(0);
    this.quantitySubject.next(0);
    // tambien tengo q vaciar el array donde estan los productos
    this.products=[];
  }

  constructor() { }
}


// BehaviorSubject vs Subject

// el subjecet es un tipo de observable especial,q nos permite realizar ciertas tareaS, un observable es un flujo de datos en el tiempo, y tambien
// nos permite ser observador al mismo tiempo

// el BehaviorSubject emite el ultimo valor a ls ultimas nuevas suscripciones, extiende desde el subject pero ademas de eso
// puede emitir el ultimo valor a las suscripciones
//  las diferencisa es q el behavior requiere un valor x defecto , devuelve el ultimo valor apenas sucede y se puede recuperar
//  el valor puro a tra ves del metodo getValue()

// Conviene usar un subject cuando el valor q emita el obsrevable no lo necesito en ese momento q te suscribas y sino en el futuro
// y si necesito el valor previo emitido usamos el BehaviorSubject

