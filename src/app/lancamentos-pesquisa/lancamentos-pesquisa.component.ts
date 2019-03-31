import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent {

  lancamentos = [
    { tipo:'DESPESA', descricao: 'Compra de pão', dataVencimento: '30/06/2019', dataPagamento: null, valor: 4.55, pessoa: 'Padaria do Joseph' },
    { tipo:'RECEITA', descricao: 'Venda de Software', dataVencimento: '30/06/2019', dataPagamento: '30/03/2019', valor: 8000, pessoa: 'Mucheniski Softwares' },
    { tipo:'RECEITA', descricao: 'Venda de carro', dataVencimento: '30/06/2019', dataPagamento: '30/04/2019', valor: 40000, pessoa: 'Metronorte' }
  ];

}
