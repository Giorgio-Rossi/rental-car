import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { actionsConfig, OrderBy, PaginationConfig, TableConfig } from './table-config.interface';
import { NgFor, NgIf, } from '@angular/common';
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PaginationPipe } from "../../pagination.pipe";
import {FormsModule} from  '@angular/forms';
import { CarRequestService } from '../../service/CarRequest.service';

@Component({
  selector: 'app-table',
  imports: [NgFor, NgIf, FontAwesomeModule, PaginationPipe, FormsModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})

export class TableComponent implements OnInit{
    @Input() config: TableConfig | undefined; 
    @Input() data: any[] = []; 
    @Input() actions?: actionsConfig[];

    @Output() clickAction: EventEmitter<any> = new EventEmitter();

    @Output() actionClick = new EventEmitter<{ action: string, row: any }>();

    constructor(private requestService: CarRequestService){}

    handleActionClick(action: any, row: any): void {
      console.log("Emitting row:", row);
      console.log("Emitting action: ", action)
      this.actionClick.emit({ action: action.name, row });
      this.clickAction.emit({ action: action.name, row });
    }

    currentOrderby: OrderBy | undefined;
    currentPagination: PaginationConfig = {itemsPerPage: 10, currentPage: 1};
    currentPage: number = 1;
    filter: {[key: string]: string} = {} 

    ngOnInit(): void {
      if (this.config?.currentByDefault) {
        this.currentOrderby = this.config.currentByDefault;
        this.orderData(); 
      }

      if(this.config?.pagination){
        this.currentPagination = this.config.pagination;
        this.currentPage = this.config.pagination.currentPage || 1;
      }
    }

    doFilter(): any[]{
      if(!this.data) return [];
      return this.data.filter(riga => {
        return Object.keys(this.filter).every(key => {
          if(!riga[key]) return false;
          const valoreFiltro = this.filter[key].toLowerCase();
          const valoreRiga = riga[key].toString().toLowerCase();
          return valoreRiga.includes(valoreFiltro);
        });
      });
    }

    onFilterChange(key: string, value: any): void{
      console.log(key, value);
      this.filter[key] = value?.target?.value;
      this.currentPage = 1; 
    }

    onOrder(column: string): void{
      if (!this.config?.headers.find(c => c.key === column)?.ordinable) {
        return; 
      }
      
      if(this.currentOrderby?.key === column){
        this.currentOrderby.orderby =this.currentOrderby.orderby === 'asc' ? 'desc' : 'asc';
      }

      else {
        this.currentOrderby = {key: column, orderby: 'asc'}
      }
      this.orderData();
    }

    orderData(): void{
      if (!this.currentOrderby) return;

      const { key, orderby } = this.currentOrderby;
  
      this.data.sort((a, b) => {
        if (a[key] < b[key]) return orderby === 'asc' ? -1 : 1; 
        if (a[key] > b[key]) return orderby === 'asc' ? 1 : -1; 
        return 0;
      });
    }
    
    faSort = faSort;
    faSortUp = faSortUp;
    faSortDown = faSortDown;
    getIconOrderedBy(column: string): any{
      if(this.currentOrderby?.key === column){
        return this.currentOrderby.orderby === 'asc' ? this.faSortUp : this.faSortDown;
      }
      return this.faSort 
    }

    changePage(page: number): void{
      if(page < 1 || page > this.getNumberPage()) return;
      this.currentPage = page;    
    }
  
    getNumberPage(){
    if(!this.currentPagination?.itemsPerPage) return 1;
      return Math.ceil(this.data.length / this.currentPagination.itemsPerPage);
    }
    
    getPage(): number[]{
      const numberPage = this.getNumberPage();
      return Array.from({length: numberPage}, (_, i) => i + 1);
      }

      canEditRequest(row: any): boolean {
        return this.requestService.canEditRequest(row);
      }


  }
