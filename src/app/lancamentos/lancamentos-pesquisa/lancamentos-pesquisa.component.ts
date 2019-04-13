import { Component, OnInit, ViewChild } from '@angular/core';

import { LazyLoadEvent } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/api';
import { ConfirmationService } from 'primeng/api';

import { LancamentoService, LancamentoFiltro } from './../lancamento.service';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent implements OnInit {

  totalRegistros = 0;
  pagina = 0;
  filtro = new LancamentoFiltro();
  lancamentos = [];
  @ViewChild('tabela') tabela;

  constructor(private lancamentoService: LancamentoService,
              private messageService: MessageService,
              private confirmation: ConfirmationService) {}

  ngOnInit() {
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;
    this.lancamentoService.pesquisar(this.filtro)
          .then(response => { this.lancamentos = response.content;
                              this.totalRegistros = response.totalElements;
                            });
  }

  atualizarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  excluir(lancamento: any) {
    this.confirmation.confirm({
      message: 'Deseja realmente excluir?',
      accept: () => {
        this.lancamentoService.excluir(lancamento.codigo)
              .then(() => {
                if (this.tabela.first === 0) {
                  this.pesquisar();
                } else {
                  this.tabela.first = 0;
                }
              });
        this.messageService.add({severity: 'success', summary: 'Success Message', detail: 'Excluído com sucesso!'});
      },
    });
  }

}
