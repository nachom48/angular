import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';
import { Product } from './interface/product.interface';
import { ProductsService } from '../../shared/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  //tenemos q ponerle el ! al final para q no me tome error de q no esta inicializada
  products!:Product[]
  //aca inyectamos el servicio en el constructor
  constructor(private productSvc:ProductsService,private shoppingCartSvc : ShoppingCartService ) { }
//dentro del ngInit se llama al service, llamamos al getProduct q tenemos en el service, luego utilizamos le metodo pipe() y suscribe() y escribimos el resultado en la consola,
  ngOnInit(): void {
    this.productSvc.getProducts()
    .pipe(
      tap(( products:Product[]) => this.products= products)
    )
    .subscribe();
  }
    addToCart(product:Product): void {
      this.shoppingCartSvc.updateCart(product);
      console.log("Add to cart",product)
    }
  }


