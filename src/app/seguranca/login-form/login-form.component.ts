import { Component, OnInit } from '@angular/core';

import { MessageService } from 'primeng/components/common/api';

import { Usuario } from '../usuario';
import { AuthService } from './../auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  usuario = new Usuario();

  constructor(
    private messageService: MessageService,
    private auth: AuthService
  ) { }

  ngOnInit() {
  }

  login(usuario: string, senha: string) {
    this.auth.login(usuario, senha);
  }

}
