import {Component, OnInit} from "@angular/core";
import {InfoService} from "../../services/info.service";
import {Info} from "../../model/Info";
import {MatDialog} from "@angular/material/dialog";
import {InfoEditarComponent} from "./popup/info-editar.component";

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {

  constructor(private infoService: InfoService,
              public dialog: MatDialog) {}

  ngOnInit(): void {
    this.buscarInfoPorTipo();
  }

  listInfos: Array<Info> = [];
  listTipos = [
      {id: 0, label: 'Equipamento'},
      {id: 1, label: 'Atividade'},
      {id: 2, label: 'Ordem'}
  ]

  displayedColumns: string[] = ['info-descricao', 'info-peso', 'info-editar', 'info-excluir'];

  tipoSelecionado = 0;

  buscarInfoPorTipo(): void {
    this.infoService.get(this.tipoSelecionado).subscribe(result => {
      this.listInfos = result;
    });
  }

  cadastrarInfo(): void {

    var newInfo = new Info()
    newInfo.tipo = this.tipoSelecionado;
    console.log(this.tipoSelecionado);

    const dialogRef = this.dialog.open(InfoEditarComponent, {
      data: newInfo,
    });

    dialogRef.afterClosed().subscribe(() => {});
  }

  insertUpdate(info: Info): void {
    const dialogRef = this.dialog.open(InfoEditarComponent, {
      data: info,
    });

    dialogRef.afterClosed().subscribe(() => {
      this.buscarInfoPorTipo();
    });
  }

  delete(info: Info): void {
    this.infoService.delete(info).subscribe(() =>{
      this.listInfos.forEach((item, index) => {
        if(item === info){
          this.listInfos.splice(index,1);
        }
      });
    });
  }

}
