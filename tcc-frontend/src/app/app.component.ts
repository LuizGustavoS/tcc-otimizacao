import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {MatTabChangeEvent} from "@angular/material/tabs";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  navLinks: any[];
  toggle = true

  constructor(
      private router: Router
  ) {
    this.navLinks = [
      {
        label: 'Upload',
        index: 0
      }, {
        label: 'Listagem',
        index: 1
      },
      {
        label: 'Configurações ',
        index: 2
      },
    ];
  }

  onTabChanged(index: number): void {
    if (index === 0) {
      this.toggle = true
      this.router.navigate(['/']);
    } else if (index === 1) {
      this.router.navigate(['/info']);
    } else if (index === 2) {
      this.router.navigate(['/config']);
    }
  }
}
