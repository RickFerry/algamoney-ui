import { AuthService } from './../auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {

  constructor(private auth: AuthService){}

  login(usuario: string, senha: string) {
    this.auth.login(usuario, senha);
  }
}
