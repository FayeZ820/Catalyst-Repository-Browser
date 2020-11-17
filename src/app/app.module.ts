import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { RepositoriesModule } from './repositories/repositories.module';
import { RepositoryModule } from './repository/repository.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    RepositoriesModule,
    RepositoryModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
