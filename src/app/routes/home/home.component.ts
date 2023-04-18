import { AfterViewInit, Component, OnInit } from '@angular/core';
import Vivus from 'vivus';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit, OnInit {
  vivusInstance: Vivus | null = null;

  constructor() {}

  ngOnInit() {
    this.vivusInstance = new Vivus('animated-pencil', {duration: 400, animTimingFunction: Vivus.EASE_OUT, start: 'manual'});
  }
  
  ngAfterViewInit(): void {
    this.vivusInstance?.play();
  }

  ngOnDestroy(): void {
    this.vivusInstance?.destroy();
  }
}
