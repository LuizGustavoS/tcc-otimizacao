import {RouterModule, Routes} from "@angular/router";
import {ConfigComponent} from "./config.component";
import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";

import {MatButtonModule} from '@angular/material/button';
import {FlexModule} from "@angular/flex-layout";
import {MatIconModule} from "@angular/material/icon";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatCardModule} from "@angular/material/card";
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatDialogModule} from "@angular/material/dialog";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {MatTooltipModule} from "@angular/material/tooltip";
import {CurrencyMaskModule} from "ng2-currency-mask";

const routesM: Routes = [
  {
    path: '',
    component: ConfigComponent,
    data: {
      title: 'Config',
      path: 'config'
    },
  },
];

@NgModule({
    declarations: [
        ConfigComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routesM),

        CurrencyMaskModule,
        MatButtonModule,
        FlexModule,
        MatIconModule,
        MatTableModule,
        MatPaginatorModule,
        MatCardModule,
        MatInputModule,
        FormsModule,
        MatDialogModule,
        ReactiveFormsModule,
        MatOptionModule,
        MatSelectModule,
        MatTooltipModule
    ],
    exports: [
        ConfigComponent
    ],
    providers: []
})

export class ConfigModule {
}
