import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent {

  lancamentos = [
    { tipo: 'DESPESA', descricao: 'Compra de pão', dataVencimento: new Date(2019, 6, 9), dataPagamento: null, valor: 4.55, pessoa: 'Padaria do Joseph' },
    { tipo: 'RECEITA', descricao: 'Venda de Software', dataVencimento: new Date(2019, 6, 30), dataPagamento: new Date(2019, 3, 30), valor: 8000, pessoa: 'Mucheniski Softwares' },
    { tipo: 'RECEITA', descricao: 'Venda de carro', dataVencimento: new Date(2019, 6, 23), dataPagamento: new Date(2019, 4, 24), valor: 40000, pessoa: 'Metronorte' }
  ];

}
