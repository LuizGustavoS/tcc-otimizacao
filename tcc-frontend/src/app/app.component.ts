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
    ];
  }

  onTabChanged(event: MatTabChangeEvent): void {
    switch (event.index) {
      case 0: // index of the tab
        // this is our stub tab for link
        this.router.navigate(['/']);
        break;
      case 1:
        // do stuff with content or do nothing :)
        this.router.navigate(['/info']);
        break;
    }
  }
}
