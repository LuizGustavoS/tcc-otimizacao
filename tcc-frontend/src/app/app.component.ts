import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit{

  selected = 0;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.onTabChanged(0)
  }

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
