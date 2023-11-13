import {Component, OnInit} from '@angular/core';
import {LoaderService} from "../../services/load.service";

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

  loading: boolean | undefined;

  constructor(private loaderService: LoaderService) {
    console.log('huehue')
    this.loaderService.isLoading.subscribe((v) => {
      this.loading = v;
    });
  }

  ngOnInit() {}

}
