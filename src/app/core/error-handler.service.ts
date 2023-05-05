import { MessageService } from 'primeng/api';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService {
  constructor(private toasty: MessageService) {}

  handleError(errorResponse: any): void {
    let msg: string;

    if (typeof errorResponse === 'string') {
      msg = errorResponse;
    } else {
      msg = 'Erro ao processar serviço remoto. Tente novamente.';
      console.log(errorResponse);
    }
    this.toasty.add({ severity: 'error', summary: 'Error', detail: msg });
  }
}
