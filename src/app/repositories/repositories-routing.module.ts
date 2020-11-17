import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RepositoriesComponent } from './repositories.component';
import { RepositoriesGridComponent } from './repositories-grid/repositories-grid.component';

const routes: Routes = [
  {
    path: '',
    component: RepositoriesComponent
  },
  { path: 'repositories-grid', component: RepositoriesGridComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RepositoriesRoutingModule {
  static components = [RepositoriesComponent, RepositoriesGridComponent];
}

