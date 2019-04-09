import { LancamentoService } from './lancamentos/lancamento.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';

import { AppComponent } from './app.component';
import { LancamentosModule } from './lancamentos/lancamentos.module';
import { PessoasModule } from './pessoas/pessoas.module';
import { CategoriasModule } from './categorias/categorias.module';
import { CategoriaService } from './categorias/categoria.service';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    PessoasModule,
    LancamentosModule,
    CategoriasModule,
    CoreModule,
    HttpClientModule
  ],
  providers: [
    CategoriaService,
    LancamentoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
