import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

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

  constructor(private pessoaService: PessoaService,
              private messageService: MessageService,
              private errorHandler: ErrorHandlerService
  ) { }

  ngOnInit() {
  }

  salvar(form: FormControl) {
    this.pessoaService.salvar(this.pessoa)
          .then(() => {
            this.messageService.add({severity: 'success', summary: 'Sucesso!', detail: 'Salvo com sucesso!'});
            form.reset();
            this.pessoa = new Pessoa();
          })
          .catch(erro => this.errorHandler.handle(erro));
  }

}
