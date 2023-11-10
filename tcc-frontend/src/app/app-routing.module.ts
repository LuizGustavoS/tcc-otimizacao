import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: 'info',
    loadChildren: () => import('./modules/info/info.module').then(m => m.InfoModule)
  },
  {
    path: '**',
    loadChildren: () => import('./modules/upload/upload.module').then(m => m.UploadModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
