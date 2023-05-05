import { ErrorHandlerService } from './error-handler.service';
import { AuthService } from './../seguranca/auth.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { JwtHelperService } from '@auth0/angular-jwt';

@NgModule({
  declarations: [NavbarComponent],
  imports: [CommonModule],
  exports: [NavbarComponent],
  providers: [
    AuthService,
    JwtHelperService,
    ErrorHandlerService
  ],
})
export class CoreModule {}
