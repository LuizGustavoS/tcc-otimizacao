import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {MatTabChangeEvent} from "@angular/material/tabs";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  selected = 0;

  constructor(private router: Router) {}

  onTabChanged(index: number): void {
    this.selected = index
    if (index === 0) {
      this.router.navigate(['/']);
    } else if (index === 1) {
      this.router.navigate(['/info']);
    } else if (index === 2) {
      this.router.navigate(['/config']);
    }
  }
}
