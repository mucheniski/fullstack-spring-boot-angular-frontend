import { Component, OnInit } from '@angular/core';

import { CategoriaService } from './../../categorias/categoria.service';
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

  pessoas = [
    { label: 'Bruna', value: 1 },
    { label: 'Diego', value: 2 },
    { label: 'Miguel', value: 3 },
    { label: 'Lívia', value: 4 },
  ];

  constructor(
    private categoriaService: CategoriaService,
    private errorHandler: ErrorHandlerService
  ) { }

  ngOnInit() {
    this.carregarCategorias();
  }

  carregarCategorias() {
    return this.categoriaService.listarTodas()
              .then(categorias => {
                this.categorias = categorias.map(categoria => ({ label: categoria.nome + ' - ' + categoria.codigo , value: categoria.codigo }) );
              })
              .catch(erro => this.errorHandler.handle(erro));
  }

}
