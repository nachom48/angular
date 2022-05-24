import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:"", redirectTo:'/products',pathMatch:'full'},
  { path: 'products', loadChildren: () => import('./pages/products/products.module').then(m => m.ProductsModule) },
  { path: 'checkout', loadChildren: () => import('./pages/checkout/checkout.module').then(m => m.CheckoutModule) },
//este path es el 404
  {path: '**',redirectTo:'',pathMatch:'full'}
];
//la ruta del path ** me redirige cualquier cosa q escriba a home,y tengo q ponerla al final
//del listado xq sino se carga primero y o se cargan las otras
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
