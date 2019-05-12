import { Title } from '@angular/platform-browser';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MessageService } from 'primeng/components/common/api';

import { LancamentoService } from './../lancamento.service';
import { CategoriaService } from './../../categorias/categoria.service';
import { PessoaService } from './../../pessoas/pessoa.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';

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
  // lancamento = new Lancamento();
  formulario: FormGroup;

  constructor(
    private title: Title,
    private route: ActivatedRoute,
    private router: Router,
    private lancamentoService: LancamentoService,
    private categoriaService: CategoriaService,
    private pessoaService: PessoaService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.title.setTitle('Lançamentos');
    const codigoLancamento = this.route.snapshot.params['codigo'];

    this.configurarFormulario();

    if (codigoLancamento) {
      this.buscarPorCodigo(codigoLancamento);
    }

    this.carregarCategorias();
    this.carregarPessoas();
  }

  configurarFormulario() {
    this.formulario = this.formBuilder.group({
      codigo: [],
      tipo: [ 'RECEITA', Validators.required ],
      dataVencimento: [ null, Validators.required ],
      dataPagamento: [],
      descricao: [ null, [ Validators.required, Validators.minLength(5) ] ],
      valor: [ null, Validators.required ],
      pessoa: this.formBuilder.group({
        codigo: [ null, Validators.required ],
        nome: []
      }),
      categoria: this.formBuilder.group({
        codigo: [ null, Validators.required ],
        nome: []
      }),
      observacao: [],
      anexo: [],
      urlAnexo: []
    });
  }

  buscarPorCodigo(codigo: number) {
    this.lancamentoService.buscarPorCodigo(codigo)
          .then(lancamento => {
            // this.lancamento = lancamento;
            this.formulario.patchValue(lancamento);
          })
          .catch(erro => this.errorHandler.handle(erro));
  }

  salvar() {
    if (this.editando) {
      console.log('entrou no atualizar: ');
      this.atualizar();
    } else {
      console.log('entrou no novo: ');
      this.novo();
    }
  }

  novo() {
    this.lancamentoService.novo(this.formulario.value)
          .then(lancamento => {
            this.messageService.add({severity: 'success', summary: 'Sucesso!', detail: 'Salvo com sucesso!'});
            this.router.navigate(['/lancamentos', lancamento.codigo]);
          })
          .catch(erro => this.errorHandler.handle(erro));
  }

  atualizar() {
    this.lancamentoService.atualizar(this.formulario.value)
          .then( lancamento => {
            this.messageService.add({severity: 'success', summary: 'Sucesso!', detail: 'Atualizado com sucesso!'});
            // this.lancamento = lancamento;
            this.formulario.patchValue(lancamento);
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
    return Boolean(this.formulario.get('codigo').value);
  }

}
