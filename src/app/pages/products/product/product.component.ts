import { Component, Input, OnInit, Output,EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Product } from '../interface/product.interface';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class ProductComponent implements OnInit {
  @Input() product! : Product;
  // con el input nos comunicamos de padre a hijo, ahi le estamos mandando un producto
  @Output() addToCartClick = new EventEmitter<Product>();
  constructor() { }
 
  ngOnInit(): void {
   
}
onClick():void {
  console.log("click",this.product);
  this.addToCartClick.emit(this.product)

}
}

// para crear un metodo en ts onclick():void xq no devuelve nada solo es un evento {}, en el product Component
//para crear el evento personalizado se instancia con @OutPut(para pasarle info del hijo al padre) y con el new EventEmitter <ElTipo>



// El change detection en angular es el mecanismo o estrategia d deteccion de cambios que utiliza
// angular para saber cuando debe actualizar un componente o toda la vista en caso de que la data haya cambiado
// onPush : establece la estrategia CheckOnce (bajo demanda)
// Default : establece la estrategia CheckAlways
// estos cambios q vuelve a renderizar pueden ser producidos 
// por eventos del domainToASCII, 
// eventos del MouseEvent
// llamadas de ajax
// set interval
// set time out 