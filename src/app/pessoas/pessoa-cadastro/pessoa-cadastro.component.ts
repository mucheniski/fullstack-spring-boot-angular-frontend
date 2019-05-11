import { Title } from '@angular/platform-browser';
import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MessageService } from 'primeng/components/common/api';

import { PessoaService } from './../pessoa.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Pessoa } from '../pessoa';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {

  pessoa = new Pessoa();
  exibirFormularioContato = false;

  constructor(private title: Title,
              private route: ActivatedRoute,
              private router: Router,
              private pessoaService: PessoaService,
              private messageService: MessageService,
              private errorHandler: ErrorHandlerService
  ) { }

  ngOnInit() {
    this.title.setTitle('Pessoas');
    const codigoLancamento = this.route.snapshot.params['codigo'];

    if (codigoLancamento) {
      this.buscarPorCodigo(codigoLancamento);
    }
  }

  buscarPorCodigo(codigo: number) {
    this.pessoaService.buscarPorCodigo(codigo)
          .then(pessoa => {
            this.pessoa = pessoa;
          })
          .catch(erro => this.errorHandler.handle(erro));
  }

  salvar(form: FormControl) {
    if (this.editando) {
      this.atualizar(form);
    } else {
      this.novo(form);
    }
  }

  novo(form: FormControl) {
    this.pessoaService.salvar(this.pessoa)
          .then(pessoa => {
            this.messageService.add({severity: 'success', summary: 'Sucesso!', detail: 'Salvo com sucesso!'});
            this.router.navigate(['/pessoas', pessoa.codigo]);
          })
          .catch(erro => this.errorHandler.handle(erro));
  }

  atualizar(form: FormControl) {
    this.pessoaService.atualizar(this.pessoa)
          .then( pessoa => {
            this.messageService.add({severity: 'success', summary: 'Sucesso!', detail: 'Atualizado com sucesso!'});
            this.pessoa = pessoa;
          })
          .catch(erro => this.errorHandler.handle(erro));
  }

  // Verifica se o registro está sendo editado ou é uma criação de novo
  get editando() {
    return Boolean(this.pessoa.codigo);
  }

  abrirModalContato() {
    this.exibirFormularioContato = true;
  }

}
