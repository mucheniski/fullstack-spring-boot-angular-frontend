import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LancamentosModule } from './lancamentos/lancamentos.module';
import { LancamentoService } from './lancamentos/lancamento.service';
import { PessoasModule } from './pessoas/pessoas.module';
import { PessoaService } from './pessoas/pessoa.service';
import { CategoriasModule } from './categorias/categorias.module';
import { CategoriaService } from './categorias/categoria.service';



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
    LancamentoService,
    PessoaService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
