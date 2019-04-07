import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent {

  pessoas = [
    { nome: 'Bruna', cidade: 'Londrina', estado: 'PR', ativo: true },
    { nome: 'Diego', cidade: 'Londrina', estado: 'PR', ativo: false },
    { nome: 'Lívia', cidade: 'Londrina', estado: 'PR', ativo: true },
    { nome: 'Miguel', cidade: 'Londrina', estado: 'PR', ativo: true }
  ];

}
