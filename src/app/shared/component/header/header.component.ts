import { Component } from '@angular/core';
import { Router } from '@angular/router';


//el decorador es el @Component ,tiene 3 propiedades , stylesUrl, donde estan los estilos, el template donde esta el HTML y lo podemos modificar y el selector q nos permite reutilizar esta etiqueta
//Cuando pongo el html en el template se llama Template Inline
@Component({
  selector: 'app-header',
  template: `
  <mat-toolbar color="primary">
    <a [routerLink]="['/']"><span>XXX</span></a>
    <span></span>
    <span class="spacer"></span>
    <app-cart class="mouseHover" (click)="goToCheckOut()"></app-cart>
</mat-toolbar>
`,
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private router:Router){

  }
  //para hacer q haciendo click en el boton de cart me mande al checkout
  goToCheckOut():void{
    this.router.navigate(['/checkout']);
  }
}
// el pipe async se subscribe a un observable y tambien hace la desuscripcion,
// y el json
