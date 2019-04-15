import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';

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
    private lancamentoService: LancamentoService,
    private categoriaService: CategoriaService,
    private pessoaService: PessoaService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
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
    this.lancamentoService.salvar(this.lancamento)
          .then(() => {
            this.messageService.add({severity: 'success', summary: 'Sucesso!', detail: 'Salvo com sucesso!'});
            form.reset();
            this.lancamento = new Lancamento();
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

  // Verifica se o arquivo está sendo editado ou é uma criação de novo arquivo para o título
  get editando() {
    return Boolean(this.lancamento.codigo);
  }

}
