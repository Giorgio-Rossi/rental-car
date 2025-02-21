import { Component, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {
  @Input() config?: any; 

  @Output() onClick=new EventEmitter<any>();

  handleClick(){
    this.onClick.emit(this.config?.actions);
  }
}