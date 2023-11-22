import {ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {UploadService} from "../../services/upload.service";
import {MatDialog} from "@angular/material/dialog";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {Chart, registerables} from 'chart.js';
import _default from "chart.js/dist/plugins/plugin.tooltip";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private cdr: ChangeDetectorRef,
              private elementRef: ElementRef,
              private service: UploadService,
              public dialog: MatDialog) {
    Chart.register(...registerables);
  }

  chart: any;
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

  modelChat: any = {
    type: 'bar',
    data: {
      labels: [],
      datasets: [
        {
          label: "Sales",
          data: [],
          backgroundColor: 'blue'
        }
      ]
    },
    options: {
      aspectRatio:2.5
    }
  }

  ngOnInit(): void {}

  onUpload(event: any): void {

    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file, file.name);

    this.service.upload(formData).subscribe(response => {
      this.dataSource = new MatTableDataSource(response);
      this.listSize = response.length;
      this.listResult = response;

      this.cdr.detectChanges();
      this.createChart(response);
    });
  }

  createChart(result: any){

    let mapEquipamento = new Map<string, number>();
    for (let i = 0; i < result.length; i++) {
      var atual = mapEquipamento.get(result[i].equipamento);
      mapEquipamento.set(result[i].equipamento, (atual? atual +1 : 1))
    }

    for (let [key, value] of mapEquipamento) {
      this.modelChat.data.label.push(key);
      this.modelChat.data.datasets[0].data.push(value);
    }

    let htmlRef = this.elementRef.nativeElement.querySelector(`#yourCavasId`);
    this.chart = new Chart(htmlRef, this.modelChat);
  }

}
