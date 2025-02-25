import { CommonModule, NgIf } from '@angular/common';
import { Component, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
  imports: [NgIf, CommonModule]
})
export class ButtonComponent {
  @Input() config?: {label: string, action: () => void}; 
  @Input() icon?: string;
  @Input() customCssClass?: string;


  @Output() onClick=new EventEmitter<any>();

  handleClick(){
    if (this.config?.action) {
      this.config.action();  
      this.onClick.emit();    
    }
  }
}