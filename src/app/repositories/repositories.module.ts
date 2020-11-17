import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RepositoriesComponent } from './repositories.component';
import { RepositoriesGridComponent } from './repositories-grid/repositories-grid.component';



@NgModule({
  declarations: [RepositoriesComponent, RepositoriesGridComponent],
  imports: [
    CommonModule
  ]
})
export class RepositoriesModule { }
