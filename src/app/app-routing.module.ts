import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '', //TODO: localhost:4200
    loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule) //TODO: le estamos diciendo que en la ruta raiz va a cargar el home module de HomeModule
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
