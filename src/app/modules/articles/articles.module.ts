import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticlesRoutingModule } from './articles-routing.module';
import { ArticlesComponent } from './articles.component';
import { FormComponent } from './components/form/form.component';
import { CardComponent } from './components/card/card.component';
import { MaterialModule } from '../../shared/material/material.module'
import { FormsModule } from '@angular/forms';
import { ArticlesFormComponent } from './components/articles-form/articles-form.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ArticlesComponent,
    FormComponent,
    CardComponent,
    ArticlesFormComponent
  ],
  imports: [
    CommonModule,
    ArticlesRoutingModule, 
    MaterialModule,
    FormsModule,
    ReactiveFormsModule

  ]
})
export class ArticlesModule { }
