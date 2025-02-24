import { Component } from '@angular/core';
import { TableConfig } from '../table/table-config.interface';
import { Router } from '@angular/router';
import { MOCK_USERS } from '../../mock-data/mock-users';

@Component({
  selector: 'app-manage-users',
  imports: [],
  templateUrl: './manage-users.component.html',
  styleUrl: './manage-users.component.css'
})
export class ManageUsersComponent {
  users = MOCK_USERS;
  
  constructor(private router: Router){}

  tableMangeUser: TableConfig = {
    headers: [
      { key: 'id', columnName: 'Id utente', type: 'Number', ordinable: true, filtrable: true},
      { key: 'username', columnName: 'Username ', type: 'String', ordinable: true, filtrable: true},
      { key: 'fullName', columnName: 'Nome Completo', type: 'String', ordinable: true, filtrable: true},
      { key: 'email', columnName: 'Email', type: 'String', ordinable: true, filtrable: true},
      { key: 'role', columnName: 'Ruolo', type: 'String', ordinable: true, filtrable: true},
      { key: 'password', columnName: 'Password', type: 'String', ordinable: true, filtrable: true},
      ],
      currentByDefault: {key: 'id', orderby: 'asc'},
      pagination: {itemsPerPage: 10, currentPage:1},
      actions: {actions: [ 'Modifica', 'Elimina' ]}
    };

    handleActionClick(action: String, data: any){
     if(action === 'Modifica'){
      this.router.navigate(['/add-user'])
     }

     if(action === 'Elimina'){
      console.log('Azione di elimina inviata')
     }
    }

    addUser(event: Event): void{

    }
}
