import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CursosListaComponent } from './cursos-lista/cursos-lista.component';
import { CursosFormComponent } from './cursos-form/cursos-form.component';
import { CursoResolver } from './guards/curso.resolver';

const routes: Routes = [
  { path: '', component: CursosListaComponent },
  {
    path: 'novo',
    component: CursosFormComponent,
    resolve: {
      curso: CursoResolver,
    },
  },
  {
    path: 'editar/:id',
    component: CursosFormComponent,
    resolve: {
      curso: CursoResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CursosRoutingModule {}
