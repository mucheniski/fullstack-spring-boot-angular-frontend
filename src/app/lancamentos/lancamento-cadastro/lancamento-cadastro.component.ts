import { Title } from '@angular/platform-browser';
import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MessageService } from 'primeng/components/common/api';

import { LancamentoService } from './../lancamento.service';
import { CategoriaService } from './../../categorias/categoria.service';
import { PessoaService } from './../../pessoas/pessoa.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Lancamento } from '../lancamento';

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {

  tipos = [
    { label: 'Receita', value: 'RECEITA' },
    { label: 'Despesa', value: 'DESPESA' },
  ];

  categorias = [];
  pessoas = [];
  lancamento = new Lancamento();

  constructor(
    private title: Title,
    private route: ActivatedRoute,
    private router: Router,
    private lancamentoService: LancamentoService,
    private categoriaService: CategoriaService,
    private pessoaService: PessoaService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService
  ) { }

  ngOnInit() {
    this.title.setTitle('Lançamentos');
    const codigoLancamento = this.route.snapshot.params['codigo'];

    if (codigoLancamento) {
      this.buscarPorCodigo(codigoLancamento);
    }

    this.carregarCategorias();
    this.carregarPessoas();
  }

  buscarPorCodigo(codigo: number) {
    this.lancamentoService.buscarPorCodigo(codigo)
          .then(lancamento => {
            this.lancamento = lancamento;
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
    this.lancamentoService.salvar(this.lancamento)
          .then(lancamento => {
            this.messageService.add({severity: 'success', summary: 'Sucesso!', detail: 'Salvo com sucesso!'});
            this.router.navigate(['/lancamentos', lancamento.codigo]);
          })
          .catch(erro => this.errorHandler.handle(erro));
  }

  atualizar(form: FormControl) {
    this.lancamentoService.atualizar(this.lancamento)
          .then( lancamento => {
            this.messageService.add({severity: 'success', summary: 'Sucesso!', detail: 'Atualizado com sucesso!'});
            this.lancamento = lancamento;
          })
          .catch(erro => this.errorHandler.handle(erro));
  }

  carregarCategorias() {
    return this.categoriaService.listarTodas()
              .then(categorias => {
                this.categorias = categorias.map(categoria => ({ label: categoria.nome, value: categoria.codigo }) );
              })
              .catch(erro => this.errorHandler.handle(erro));
  }

  carregarPessoas() {
    return this.pessoaService.listarTodas()
              .then(pessoas => {
                this.pessoas = pessoas.map(pessoa => ({ label: pessoa.nome, value: pessoa.codigo }) );
              })
              .catch(erro => this.errorHandler.handle(erro));
  }

  // Verifica se o registro está sendo editado ou é uma criação de novo
  get editando() {
    return Boolean(this.lancamento.codigo);
  }

}
