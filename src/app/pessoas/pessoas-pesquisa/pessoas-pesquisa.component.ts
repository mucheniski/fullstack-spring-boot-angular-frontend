import { Component, OnInit, ViewChild } from '@angular/core';

import { LazyLoadEvent } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/api';
import { ConfirmationService } from 'primeng/api';

import { PessoaService, PessoaFiltro } from './../pessoa.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent implements OnInit {

  totalRegistros = 0;
  pagina = 0;
  filtro = new PessoaFiltro();
  pessoas = [];
  @ViewChild('tabela') tabela;

  constructor(private pessoaService: PessoaService,
              private messageService: MessageService,
              private confirmation: ConfirmationService,
              private errorHandle: ErrorHandlerService) {}

  ngOnInit(): void {
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;
    this.pessoaService.pesquisar(this.filtro)
          .then(response => { this.pessoas = response.content;
                              this.totalRegistros = response.totalElements;
                            })
          .catch(erro => this.errorHandle.handle(erro));
  }

  atualizarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  excluir(pessoa: any) {
    this.confirmation.confirm({
      message: 'Deseja realmente excluir?',
      accept: () => {
        this.pessoaService.excluir(pessoa.codigo)
              .then(() => {
                if (this.tabela.first === 0) {
                  this.pesquisar();
                } else {
                  this.tabela.first = 0;
                }
                this.messageService.add({severity: 'success', summary: 'Success Message', detail: 'Excluído com sucesso!'});
              })
              .catch(erro => this.errorHandle.handle(erro));
      },
    });
  }

}
