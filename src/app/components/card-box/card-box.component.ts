import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-card-box',
  templateUrl: './card-box.component.html',
  styleUrls: ['./card-box.component.css']
})
export class CardBoxComponent {
  @Input() cardBackgroundImage?: string;
  @Input() cardDisabled? = false;
  @Input() cardSelected? = false;
  @Input() backgroundClasses?: string;
  @Output() cardClick = new EventEmitter();
  showIcon = false;

  constructor() {}

  onCardButtonClick(event: unknown) {
    this.cardClick.emit(event);
  }
}
