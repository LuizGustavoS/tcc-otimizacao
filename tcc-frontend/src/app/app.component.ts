import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {MatTabChangeEvent} from "@angular/material/tabs";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  navLinks: any[];

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

  onTabChanged(event: MatTabChangeEvent): void {
    if (event.index === 0) {
      this.router.navigate(['/']);
    } else if (event.index === 1) {
      this.router.navigate(['/info']);
    } else if (event.index === 2) {
      this.router.navigate(['/config']);
    }
  }
}
