import {AfterViewInit, Component, Inject, OnInit, ViewChild} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";

@Component({
    selector: 'app-upload-result',
    templateUrl: './upload-result.component.html',
    styleUrls: ['./upload-result.component.css']
})
export class UploadResultComponent implements OnInit, AfterViewInit {

    listSize = 0;

    // @ts-ignore
    dataSource: MatTableDataSource<any>;

    // @ts-ignore
    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(
        public dialogRef: MatDialogRef<UploadResultComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
    }

    displayedColumns: string[] = [
        'result-ordem',
        'result-data',
        'result-equipamento',
        'result-tam',
        'result-pom',
        'result-valor',
        'result-priorizado'
    ]

    ngOnInit(): void {
        this.dataSource = new MatTableDataSource(this.data);
        this.listSize = this.data.length
    }

    ngAfterViewInit(): void {
        this.dataSource.paginator = this.paginator;
    }

}