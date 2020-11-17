import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RepositoriesRoutingModule } from './repositories-routing.module';
import { RepositoriesComponent } from './repositories.component';
import { RepositoriesGridComponent } from './repositories-grid/repositories-grid.component';



@NgModule({
  declarations: [RepositoriesComponent, RepositoriesGridComponent],
  imports: [
    CommonModule,
    RepositoriesRoutingModule
  ]
})
export class RepositoriesModule { }
