import {RouterModule, Routes} from "@angular/router";
import {DashboardComponent} from "./dashboard.component";
import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";

import {MatButtonModule} from '@angular/material/button';
import {FlexModule} from "@angular/flex-layout";
import {MatIconModule} from "@angular/material/icon";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatCardModule} from "@angular/material/card";
import {MatTabsModule} from "@angular/material/tabs";
import {MatListModule} from "@angular/material/list";
import {MatProgressBarModule} from "@angular/material/progress-bar";

const routesM: Routes = [
  {
    path: '',
    component: DashboardComponent,
    data: {
      title: 'Upload',
      path: 'upload'
    },
  },
];

@NgModule({
    declarations: [
        DashboardComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routesM),

        MatButtonModule,
        FlexModule,
        MatIconModule,
        MatTableModule,
        MatPaginatorModule,
        MatCardModule,
        MatTabsModule,
        MatListModule,
        MatProgressBarModule
    ],
    exports: [
        DashboardComponent
    ],
    providers: []
})

export class DashboardModule {
}
