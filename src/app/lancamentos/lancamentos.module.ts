import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/components/tooltip/tooltip';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CalendarModule } from 'primeng/calendar';
import { SelectButtonModule } from 'primeng/components/selectbutton/selectbutton';
import { DropdownModule } from 'primeng/components/dropdown/dropdown';
import { DataTableModule } from 'primeng/datatable';

import { CurrencyMaskModule } from 'ng2-currency-mask';
import { SharedModule } from '../shared/shared.module';

import { LancamentosRoutingModule } from './lancamentos-routing.module';
import { LancamentoCadastroComponent } from './lancamento-cadastro/lancamento-cadastro.component';
import { LancamentosPesquisaComponent } from './lancamentos-pesquisa/lancamentos-pesquisa.component';

@NgModule({
  declarations: [
    LancamentosPesquisaComponent,
    LancamentoCadastroComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    InputTextModule,
    ButtonModule,
    TooltipModule,
    InputTextareaModule,
    CalendarModule,
    SelectButtonModule,
    DropdownModule,
    DataTableModule,
    CurrencyMaskModule,
    SharedModule,

    LancamentosRoutingModule
  ],
  exports: []
})
export class LancamentosModule { }
