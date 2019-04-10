import { Component, OnInit } from '@angular/core';

import { LancamentoService, LancamentoFiltro } from './../lancamento.service';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent implements OnInit {

  descricao: string;
  dataVencimentoDe: Date;
  dataVencimentoAte: Date;

  lancamentos = [];

  constructor(private lancamentoService: LancamentoService) {}

  ngOnInit() {
    this.pesquisar();
  }

  pesquisar() {

    const filtro: LancamentoFiltro = {
      descricao: this.descricao,
      dataVencimentoDe: this.dataVencimentoDe,
      dataVencimentoAte: this.dataVencimentoAte
    };

    this.lancamentoService.pesquisar(filtro)
          .then(response => this.lancamentos = response.content);
  }

}
