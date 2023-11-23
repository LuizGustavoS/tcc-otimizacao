import {ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {UploadService} from "../../services/upload.service";
import {MatDialog} from "@angular/material/dialog";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {Chart, registerables} from 'chart.js';
import {Result} from "../../model/Result";


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

  qtdePriorizada = 0;
  valorPriorizado = 0;

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
          label: "",
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

  createChart(result: Result[]){

    let mapEquipamento = new Map<string, number>();
    let mapCriticidade = new Map<string, number>();
    let mapAtividade = new Map<string, number>();

    for (let i = 0; i < result.length; i++) {
      if (!result[i].priorizado){
        continue
      }

      const equipAtual = mapEquipamento.get(result[i].equipamento);
      mapEquipamento.set(result[i].equipamento, (equipAtual? equipAtual +1 : 1))

      const critAtual = mapCriticidade.get(result[i].pom);
      mapCriticidade.set(result[i].pom, (critAtual? critAtual +1 : 1))

      const ativAtual = mapAtividade.get(result[i].tam);
      mapAtividade.set(result[i].tam, (ativAtual? ativAtual +1 : 1))

      this.valorPriorizado+=result[i].valor;
      this.qtdePriorizada++
    }

    const chartEquipamento = Object.assign(JSON.parse(JSON.stringify(this.modelChat)));
    chartEquipamento.data.datasets[0].label = 'Equipamento';
    chartEquipamento.data.labels = Array.from(mapEquipamento.keys());
    chartEquipamento.data.datasets[0].data = Array.from(mapEquipamento.values());

    const chartCriticidade = JSON.parse(JSON.stringify(this.modelChat));
    chartCriticidade.data.datasets[0].label = 'Criticidade';
    chartCriticidade.data.labels = Array.from(mapCriticidade.keys());
    chartCriticidade.data.datasets[0].data = Array.from(mapCriticidade.values());

    const chartAtividade = JSON.parse(JSON.stringify(this.modelChat));
    chartAtividade.data.datasets[0].label = 'Atividade';
    chartAtividade.data.labels = Array.from(mapAtividade.keys());
    chartAtividade.data.datasets[0].data = Array.from(mapAtividade.values());

    let refEquipamento = this.elementRef.nativeElement.querySelector(`#chartEquipamento`);
    let refCriticidade = this.elementRef.nativeElement.querySelector(`#chartCriticidade`);
    let refAtividade = this.elementRef.nativeElement.querySelector(`#chartAtividade`);

    this.chart = new Chart(refEquipamento, chartEquipamento);
    this.chart = new Chart(refCriticidade, chartCriticidade);
    this.chart = new Chart(refAtividade, chartAtividade);
  }

}
