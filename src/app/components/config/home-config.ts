import { TableConfig } from '../../components/table/table-config.interface';
import { ButtonConfig } from '../../components/button/button-config.interface';
import { Router } from '@angular/router';
import { CarRequestService } from '../../service/CarRequest.service';

export function getTableAdminConfig(): TableConfig {
  return {
    headers: [
      { key: 'id', columnName: 'Codice richiesta', type: 'Number', ordinable: true, filtrable: true },
      { key: 'carDetails', columnName: 'Targa auto', type: 'String', ordinable: true, filtrable: true },
      { key: 'fullName', columnName: 'Cliente', type: 'String', ordinable: true, filtrable: true },
      { key: 'status', columnName: 'Stato prenotazione', type: 'Date', ordinable: false, filtrable: true }
    ],
    currentByDefault: { key: 'id', orderby: 'asc' },
    pagination: { itemsPerPage: 10, currentPage: 1 },
    actions: { 
      actions: [
        {
          name: 'Modifica',
          visible: (row: any) => true
        },
        {
          name: 'Cancella',
          visible: (row: any) => true
        } 
      ] 
    }
  };
}

export function getTableCustomerConfig(carRequestService: CarRequestService): TableConfig {
  return {
    headers: [
      { key: 'id', columnName: 'Codice richiesta', type: 'Number', ordinable: true, filtrable: true },
      { key: 'carDetails', columnName: 'Macchina', type: 'String', ordinable: false, filtrable: true },
      { key: 'status', columnName: 'Stato prenotazione', type: 'String', ordinable: true, filtrable: true },
      { key: 'start_reservation', columnName: 'Data inizio prenotazione', type: 'Date', ordinable: true, filtrable: true },
      { key: 'end_reservation', columnName: 'Data fine prenotazione', type: 'Date', ordinable: false, filtrable: true }
    ],
    currentByDefault: { key: 'id', orderby: 'asc' },
    pagination: { itemsPerPage: 10, currentPage: 1 },
    actions: {
      actions: [
        { 
          name: 'Modifica', 
          visible: (row: any) => carRequestService.canEditRequest(row) 
        },
        { 
          name: 'Cancella', 
          visible: (row: any) => true 
        }
      ]
    }
  };
}

export function getButtonConfigsAdmin(router: Router): ButtonConfig[] {
  return [
    { label: 'Home', action: () => router.navigate(['/home']) },
    { label: 'Gestisci richieste', action: () => router.navigate(['/manage-requests']) },
    { label: 'Gestisci auto', action: () => router.navigate(['/manage-cars']) },
    { label: 'Aggiungi auto', action: () => router.navigate(['/add-car']) },
    { label: 'Gestisci utenti', action: () => router.navigate(['/manage-users']) },
    { label: 'Aggiungi utente', action: () => router.navigate(['/add-user']) }
  ];
}

export function getButtonConfigsUser(router: Router): ButtonConfig[] {
  return [
    { label: 'Home', action: () => router.navigate(['/home']) },
    { label: 'Aggiungi richieste di prenotazione', action: () => router.navigate(['/new-request']) },
  ];
}
