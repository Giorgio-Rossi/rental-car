import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pagination'
})
export class PaginationPipe implements PipeTransform {

  transform(value: any[], currentPage: number, itemsPerPage: number): any[] {
    // Se non è configurata restituisco tutti gli elementi
    if(!value || !currentPage || !itemsPerPage  || itemsPerPage === undefined){
      return value;
    }

    const inizio = (currentPage - 1) * itemsPerPage; // Indice page 1
    const fine = inizio + itemsPerPage; // Ultima page
    return value.slice(inizio, fine);
    
  }

}
