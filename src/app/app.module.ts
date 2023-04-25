import { HttpClientModule, HttpRequest } from '@angular/common/http';
import { SegurancaModule } from './seguranca/seguranca.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';

import { AppRoutingModule } from './app-routing.module';
import { LancamentosModule } from './lancamentos/lancamentos.module';
import { PessoasModule } from './pessoas/pessoas.module';
import { JwtModule } from '@auth0/angular-jwt';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    LancamentosModule,
    PessoasModule,
    CoreModule,
    SegurancaModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["example.com"],
        disallowedRoutes: ["http://example.com/examplebadroute/"],
      },
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
function tokenGetter(request?: HttpRequest<any> | undefined): string | Promise<string | null> | null {
  throw new Error('Function not implemented.');
}

