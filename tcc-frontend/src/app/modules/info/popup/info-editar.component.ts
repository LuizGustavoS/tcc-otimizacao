import {Component, Inject, OnInit} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Info} from "../../../model/Info";
import {InfoService} from "../../../services/info.service";
import {FormBuilder, FormControl} from "@angular/forms";

@Component({
    selector: 'app-info-editar',
    templateUrl: './info-editar.component.html',
    styleUrls: ['./info-editar.component.css']
})
export class InfoEditarComponent implements OnInit {

    constructor(
        public dialogRef: MatDialogRef<InfoEditarComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Info,
        private formBuilder: FormBuilder,
        private infoService: InfoService
    ) {}

    form: any;

    ngOnInit(): void {
        this.createForm(this.data);
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    gravar(): void {

        if (this.form.value.id){
            this.infoService.update(this.form.value).subscribe(() => {
                this.dialogRef.close();
            });
            return;
        }

        this.infoService.create(this.form.value).subscribe(() => {
            this.dialogRef.close();
        });
    }

    private createForm(info: Info): void {
        this.form = this.formBuilder.group({
            id: [info.id, new FormControl()],
            descricao: [info.descricao, new FormControl()],
            peso: [info.peso, new FormControl()],
            tipo: [info.tipo, new FormControl()]
        });
    }

}