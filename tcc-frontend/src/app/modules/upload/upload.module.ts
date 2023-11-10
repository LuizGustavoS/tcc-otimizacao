import {RouterModule, Routes} from "@angular/router";
import {UploadComponent} from "./upload.component";
import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";

import {MatButtonModule} from '@angular/material/button';
import {FlexModule} from "@angular/flex-layout";
import {MatIconModule} from "@angular/material/icon";
import {MatTableModule} from "@angular/material/table";
import {UploadResultComponent} from "./result/upload-result.component";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatCardModule} from "@angular/material/card";

const routesM: Routes = [
  {
    path: '',
    component: UploadComponent,
    data: {
      title: 'Upload',
      path: 'upload'
    },
  },
];

@NgModule({
  declarations: [
    UploadComponent,
    UploadResultComponent,
  ],
    imports: [
        CommonModule,
        RouterModule.forChild(routesM),

        MatButtonModule,
        FlexModule,
        MatIconModule,
        MatTableModule,
        MatPaginatorModule,
        MatCardModule
    ],
  providers: []
})

export class UploadModule {
}
