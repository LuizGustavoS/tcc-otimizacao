import {RouterModule, Routes} from "@angular/router";
import {CommonModule} from "@angular/common";
import {InfoComponent} from "./info.component";
import {NgModule} from "@angular/core";

import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatSelectModule} from "@angular/material/select";
import {InfoEditarComponent} from "./popup/info-editar.component";
import {MatDialogModule} from "@angular/material/dialog";
import {MatInputModule} from "@angular/material/input";
import {MatTableModule} from "@angular/material/table";
import {ReactiveFormsModule} from "@angular/forms";
import {MatTooltipModule} from "@angular/material/tooltip";

const routesM: Routes = [
  {
    path: '',
    component: InfoComponent,
    data: {
      title: 'Info',
      path: 'info'
    },
  },
];

@NgModule({
  declarations: [
    InfoComponent,
    InfoEditarComponent
  ],
    imports: [
        CommonModule,
        FlexLayoutModule,
        ReactiveFormsModule,
        RouterModule.forChild(routesM),

        MatButtonModule,
        MatCardModule,
        MatDialogModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatSelectModule,
        MatSnackBarModule,
        MatTableModule,
        MatTooltipModule
    ],
  providers: []
})

export class InfoModule {
}
