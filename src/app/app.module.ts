import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';
import { MessageComponent } from './message/message.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LancamentosModule } from './lancamentos/lancamentos.module';
import { PessoasModule } from './pessoas/pessoas.module';

@NgModule({
  declarations: [AppComponent, NavbarComponent, MessageComponent],
  imports: [BrowserModule, AppRoutingModule, LancamentosModule, PessoasModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
