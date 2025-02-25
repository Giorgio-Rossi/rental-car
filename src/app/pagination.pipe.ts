import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pagination'
})
export class PaginationPipe implements PipeTransform {

  transform(value: any[], currentPage: number, itemsPerPage: number): any[] {
    if(!value || !currentPage || !itemsPerPage  || itemsPerPage === undefined){
      return value;
    }

    const inizio = (currentPage - 1) * itemsPerPage; 
    const fine = inizio + itemsPerPage;
    return value.slice(inizio, fine);
    
  }

}
