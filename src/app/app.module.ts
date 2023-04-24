import { HttpClientModule } from '@angular/common/http';
import { SegurancaModule } from './seguranca/seguranca.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';

import { AppRoutingModule } from './app-routing.module';
import { LancamentosModule } from './lancamentos/lancamentos.module';
import { PessoasModule } from './pessoas/pessoas.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    LancamentosModule,
    PessoasModule,
    CoreModule,
    SegurancaModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
