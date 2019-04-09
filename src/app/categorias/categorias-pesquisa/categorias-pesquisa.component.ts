import { Component, OnInit } from '@angular/core';

import { Categoria } from './../categoria';
import { CategoriaService } from './../categoria.service';

@Component({
  selector: 'app-categorias-pesquisa',
  templateUrl: './categorias-pesquisa.component.html',
  styleUrls: ['./categorias-pesquisa.component.css']
})
export class CategoriasPesquisaComponent implements OnInit {

  categorias: Categoria[];

  constructor(private categoriaService: CategoriaService) { }

  ngOnInit() {
    this.pesquisar();
  }

  pesquisar(): void {
    this.categoriaService.pesquisar()
          .subscribe(categorias => this.categorias = categorias);
  }

}
