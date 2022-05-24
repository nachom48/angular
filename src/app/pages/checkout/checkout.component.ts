import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { delay, switchMap, tap } from 'rxjs';
import { Store } from 'src/app/shared/interface/stores.interface.ts.service';
import { DataService } from 'src/app/shared/services/data.service';
import { Details, DetailsOrder, Order } from 'src/app/shared/interface/order.interface';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';
import { Product } from '../products/interface/product.interface';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/shared/services/products.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  constructor(
    private dataSvc:DataService,
    private shoppingCartSvc:ShoppingCartService,
    private router: Router,
    private productSvc:ProductsService
    )
    {
      this.checkIfCartIsEmpty()
    }

  isDelivery = true;
  Cart:Product[]=[];
  model={
    name:'',
    store:'',
    shippingAdress:'',
    city:''
  }

  stores:Store[]=[]

  private getStores():void{
    //Todo
    this.dataSvc.getStores()
    .pipe(
      tap(( stores:Store[]) =>  this.stores = stores))
    .subscribe()
  }

  ngOnInit(): void {
    this.getStores();
    this.getDataCart();
  }
  onPickupOrDelivery(value: boolean): void {
    this.isDelivery = value;
  }
  // Aca hago un dstructurado xq no neceisto todo el objeto, el value es un ngForm y la renombramos como formData
onSubmit({value:formData}:NgForm):void{
//  creamos una variable para almacenar los datos de mi formulario y le agrego la fecha
console.log('Guardar', formData);
const data: Order = {
  ...formData,
  date: this.getCurrentDay(),
  isDelivery: this.isDelivery
}
this.dataSvc.saveOrder(data)
  .pipe(
    tap(res => console.log('Order ->', res)),
    switchMap(({ id: orderId }) => {
      const details = this.prepareDetails();
      return this.dataSvc.saveDetailsOrder({ details, orderId });
    }),
    tap(() => this.router.navigate(['/checkout/thank-you-page'])),
    delay(2000),
    tap(()=>this.shoppingCartSvc.resetCart())
  )
  .subscribe();
}

private getCurrentDay():string{
  return new Date().toLocaleDateString();
}

private prepareDetails():Details[]{
    // Para inicializar un array vacio en Ts se hace const details: Details xq es del tipo Details ( una interface creada) y luego = []
    const details:Details[]=[];
    this.Cart.forEach((product:Product)=>{
    const { id:productId,name:productName,qty:quantity,stock}=product;
    const updateStock=(stock-quantity);
    // Aca llamo al metodo para updatear el stock y para hacer el Patch y espera dos argumentos, el Id del roducto q actualizo y el nuevo stock q lleva
    // q es lo q se calcula con el updateStock
    this.productSvc.updateStock(productId,updateStock)
    .pipe(
      tap(res=>details.push({productId,productName,quantity}))
    )
    .subscribe()
    // Aca hago una desestructuracion,JavaScript
    details.push({productId,productName,quantity})});
  return details;

}
private getDataCart():void{
  this.shoppingCartSvc.cartAction$
  .pipe(
    tap((products)=>this.Cart=products)
  )
  .subscribe()
}

private checkIfCartIsEmpty():void{
  this.shoppingCartSvc.cartAction$
  .pipe(
    tap((products:Product[])=>{
      if(Array.isArray(products)&& !products.length){
        this.router.navigate(['/products']);
      }
    })
  )
  .subscribe()
}
}


// Cuando declaro un metodo primero va si es publico o privado, luego elnombre del metodo ( los parametros q recibe): y luego lo q devuelve, o void si es nada o lo q
// sea q devuelva

