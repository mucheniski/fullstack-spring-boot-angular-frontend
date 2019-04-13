import { Injectable } from '@angular/core';

import { MessageService } from 'primeng/components/common/api';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(private messageService: MessageService ) { }

  handle(errorResponse: any) {
    let msg: string;

    if (typeof errorResponse === 'string') {
      msg = errorResponse;
    } else {
      msg = 'Erro 1: Tente novamente!';
      console.log('Erro de sistema: ', errorResponse);
    }

    this.messageService.add({severity: 'error', summary: 'Error Message', detail: msg});
  }

}
