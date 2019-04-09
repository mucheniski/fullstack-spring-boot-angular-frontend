import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriasPesquisaComponent } from './categorias-pesquisa/categorias-pesquisa.component';

@NgModule({
  declarations: [CategoriasPesquisaComponent],
  imports: [
    CommonModule
  ],
  exports: [
    CategoriasPesquisaComponent
  ]
})
export class CategoriasModule { }
