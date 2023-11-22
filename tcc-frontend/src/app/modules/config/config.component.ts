import {Component, OnInit} from "@angular/core";
import {Config} from "../../model/Config";
import {FormBuilder, FormControl} from "@angular/forms";
import {ConfigService} from "../../services/config.service";

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {

  form: any;

  constructor(
      private formBuilder: FormBuilder,
      private configService: ConfigService
  ) {}

  ngOnInit(): void {
    this.configService.get().subscribe(response => {
      this.createForm(response);
    })
  }

  onNoClick(): void {
    this.configService.get().subscribe(response => {
      this.createForm(response);
    })
  }

  gravar(): void {
    this.configService.update(this.form.value).subscribe(response => {
      this.createForm(response);
    })
  }

  createForm(config: Config): any {
    this.form = this.formBuilder.group({
      id: [config.id, new FormControl()],
      num_pop_init: [config.num_pop_init, new FormControl()],
      num_geracoes: [config.num_geracoes, new FormControl()],
      orcamento_mes: [config.orcamento_mes, new FormControl()]
    });
  }

}
