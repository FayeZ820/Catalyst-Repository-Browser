import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes,
  PreloadAllModules,
  NoPreloading,
} from '@angular/router';

import { PreloadModulesStrategy } from './core/strategies/preload-modules.strategy';

const app_routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/repositories' },
  // {
  //   path: 'repositories/:name',
  //   data: { preload: true },
  //   loadChildren: () =>
  //     import('./repository/repository.module').then((m) => m.RepositoryModule),
  // },
  {
    path: 'repositories',
    loadChildren: () =>
      import('./repositories/repositories.module').then(
        (m) => m.RepositoriesModule
      ),
  },
  { path: '**', pathMatch: 'full', redirectTo: '/repositories' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(app_routes, {
      preloadingStrategy: PreloadModulesStrategy,
      relativeLinkResolution: 'legacy',
    }),
  ],
  exports: [RouterModule],
  providers: [PreloadModulesStrategy],
})
export class AppRoutingModule {}
