import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'articles', pathMatch: 'full', loadChildren: () => import('./modules/articles/articles.module').
    then((m) => m.ArticlesModule)
  },
  {
    path: '', pathMatch: 'full', redirectTo: 'articles'
  },
  {
    path: 'section2', pathMatch: 'full', loadChildren: () => import('./modules/section2/section2.module').
    then((m) => m.Section2Module)
  },
  {
    path: 'section3', pathMatch: 'full', loadChildren: () => import('./modules/section3/section3.module').
    then((m) => m.Section3Module)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
