import { Title } from '@angular/platform-browser';
import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MessageService } from 'primeng/components/common/api';

import { PessoaService } from './../pessoa.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Pessoa, Contato } from '../pessoa';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {

  pessoa = new Pessoa();
  exibirFormularioContato = false;
  contato: Contato;
  contatoIndex: number;
  estados: any[];
  cidades: any[];
  estadoSelecionado: number;

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
    this.listarEstados();

    if (codigoLancamento) {
      this.buscarPorCodigo(codigoLancamento);
    }
  }

  buscarPorCodigo(codigo: number) {
    this.pessoaService.buscarPorCodigo(codigo)
          .then(pessoa => {
            this.pessoa = pessoa;
            this.estadoSelecionado = (this.pessoa.endereco.cidade) ? this.pessoa.endereco.cidade.estado.codigo : null;

            if (this.estadoSelecionado) {
              this.listarCidades();
            }

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
    this.contato = new Contato();
    this.contatoIndex = this.pessoa.contatos.length;
  }

  editarContato(contato: Contato, index: number) {
    this.contato = this.setarContato(contato);
    this.exibirFormularioContato = true;
    this.contatoIndex = index;
  }

  confirmarContato(formContato: FormControl) {
    this.pessoa.contatos[this.contatoIndex] = this.setarContato(this.contato);
    this.exibirFormularioContato = false;
    formContato.reset();
  }

  removerContato(index: number) {
    this.pessoa.contatos.splice(index, 1);
  }

  setarContato(contato: Contato): Contato {
    return new Contato(contato.codigo, contato.nome, contato.email, contato.telefone);
  }

  listarEstados() {
    this.pessoaService.listarEstados()
          .then(response => {
            this.estados = response.map(estado => ({ label: estado.nome, value: estado.codigo }) );
          })
          .catch(erro => this.errorHandler.handle(erro));
  }

  listarCidades() {
    this.pessoaService.pesquisarCidades(this.estadoSelecionado)
          .then(response => {
            this.cidades = response.map(cidade => ({ label: cidade.nome, value: cidade.codigo }));
          })
          .catch(erro => this.errorHandler.handle(erro));
  }

}
