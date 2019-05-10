import { JwtHelperService } from '@auth0/angular-jwt';
import { Title } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessageService, ConfirmationService } from 'primeng/api';

import { NavbarComponent } from './navbar/navbar.component';
import { ErrorHandlerService } from './error-handler.service';
import { CategoriaService } from '../categorias/categoria.service';
import { LancamentoService } from '../lancamentos/lancamento.service';
import { DashboardService } from './../dashboard/dashboard.service';
import { RelatoriosService } from './../relatorios/relatorios.service';
import { PessoaService } from '../pessoas/pessoa.service';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada.component';
import { NaoAutorizadoComponent } from './nao-autorizado.component';
import { AuthService } from './../seguranca/auth.service';
import { InterceptaHttp } from '../seguranca/intercepta-http';

registerLocaleData(localePt);

@NgModule({
  declarations: [
    NavbarComponent,
    PaginaNaoEncontradaComponent,
    NaoAutorizadoComponent
  ],
  imports: [
    CommonModule,
    ToastModule,
    ConfirmDialogModule,
    RouterModule
  ],
  exports: [
    NavbarComponent,
    ToastModule,
    ConfirmDialogModule
  ],
  providers: [
    Title,
    MessageService,
    ConfirmationService,
    JwtHelperService,

    InterceptaHttp,
    ErrorHandlerService,
    CategoriaService,
    LancamentoService,
    PessoaService,
    DashboardService,
    RelatoriosService,
    AuthService,
    { provide: LOCALE_ID, useValue: 'pt' }
  ]
})
export class CoreModule { }
