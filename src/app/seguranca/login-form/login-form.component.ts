import { Component, OnInit } from '@angular/core';

import { Usuario } from '../usuario';
import { MessageService } from 'primeng/components/common/api';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  usuario = new Usuario();

  constructor(
    private messageService: MessageService,
  ) { }

  ngOnInit() {
  }

  login(usuario: string, senha: string) {
  }

}
