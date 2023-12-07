import {Component, Inject, OnInit} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Info} from "../../../model/Info";
import {InfoService} from "../../../services/info.service";
import {FormBuilder, FormControl} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
    selector: 'app-info-apagar',
    templateUrl: './info-apagar.component.html',
    styleUrls: ['./info-apagar.component.css']
})
export class InfoApagarComponent implements OnInit {

    constructor(
        public dialogRef: MatDialogRef<InfoApagarComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Info,
        private infoService: InfoService,
        private _snackBar: MatSnackBar
    ) {}

    ngOnInit(): void {}

    apagar(): void{
        this.infoService.delete(this.data).subscribe(() => {
            this._snackBar.open('Dados Apagados com Sucesso', 'OK')
            this.dialogRef.close();
        });
    }

    cancelar(): void {
        this.dialogRef.close();
    }

}