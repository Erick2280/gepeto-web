import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pencil-button',
  templateUrl: './pencil-button.component.html',
  styleUrls: ['./pencil-button.component.css']
})
export class PencilButtonComponent {
  @Input() buttonRouterLink?: string;

}
