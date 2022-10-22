import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    
    children:[
      {
        path: 'administrador',
        loadChildren: () => import('../administrador/administrador.module').then(m => m.AdministradorPageModule)
      },
      {
        path: 'perfil/:rut',
        loadChildren: () => import('../perfil/perfil.module').then( m => m.PerfilPageModule)
      },
      {
        path: 'admin-clases',
        loadChildren: () => import('../admin-clases/admin-clases.module').then( m => m.AdminClasesPageModule)
      },
      {
        path: 'docente',
        loadChildren: () => import('../docente/docente.module').then( m => m.DocentePageModule)
      },
      {
        path: 'alumno',
        loadChildren: () => import('../alumno/alumno.module').then( m => m.AlumnoPageModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
