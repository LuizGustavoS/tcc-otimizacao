import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {UploadService} from "../../services/upload.service";
import {MatDialog} from "@angular/material/dialog";
import {UploadResultComponent} from "./result/upload-result.component";

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css', 'upload.component.scss']
})
export class UploadComponent implements OnInit {

  constructor(private router: Router,
              private service: UploadService,
              public dialog: MatDialog) {}

  file: any = null;
  listResult: any = null;

  ngOnInit(): void {}

  onChange(event: any): void {
    this.file = event.target.files[0];
  }

  onUpload(): void {
    const formData = new FormData();
    formData.append("file", this.file, this.file.name);

    this.service.upload(formData).subscribe(response => {
      // @ts-ignore
      const dialogRef = this.dialog.open(UploadResultComponent, {
        data: response,
      });
      dialogRef.afterClosed().subscribe(() => {});
    });
  }

  abrirInfos(): void {
    this.router.navigate(['/info']).then(() => console.log('deu boa'));
  }

}
