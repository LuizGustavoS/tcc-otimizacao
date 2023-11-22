import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild} from "@angular/core";
import {UploadService} from "../../services/upload.service";
import {MatDialog} from "@angular/material/dialog";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {

  constructor(private service: UploadService,
              public dialog: MatDialog) {}

  listSize = 0;
  listResult: any = null;

  @ViewChild(MatPaginator, {static: false})
  set paginator(value: MatPaginator) {
    if (this.dataSource){
      this.dataSource.paginator = value;
    }
  }

  dataSource = new MatTableDataSource<any>();

  displayedColumns: string[] = [
    'result-ordem',
    'result-data',
    'result-equipamento',
    'result-tam',
    'result-pom',
    'result-valor',
    'result-priorizado'
  ]

  ngOnInit(): void {}

  ngAfterViewInit(): void {

  }

  onUpload(event: any): void {

    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file, file.name);

    this.service.upload(formData).subscribe(response => {
      this.dataSource = new MatTableDataSource(response);
      this.listSize = response.length;
      this.listResult = response;
    });
  }

}
