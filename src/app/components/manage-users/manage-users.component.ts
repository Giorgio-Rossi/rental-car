import { Component, inject, OnInit } from '@angular/core';
import { TableConfig } from '../table/table-config.interface';
import { Router } from '@angular/router';
import { UserService } from '../../service/user.service'; 
import { User } from '../../interface/user.model.interface'; 
import { TableComponent } from "../table/table.component";
import { NavbarComponent } from "../navbar/navbar.component";
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-manage-users',
  imports: [TableComponent],
  templateUrl: './manage-users.component.html',
  styleUrl: './manage-users.component.css'
})
export class ManageUsersComponent implements OnInit {
  users: User[] = []; 
  router = inject(Router);
  userService = inject(UserService);
  authService = inject(AuthService);
  
  ngOnInit(): void {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });

    const userRole = this.authService.getUserType(); 
    if (userRole !== 'ADMIN') {
      this.router.navigate(['/home']);
    }
  }

  tableManageUser: TableConfig = {
    headers: [
      { key: 'id', columnName: 'Id utente', type: 'Number', ordinable: true, filtrable: true},
      { key: 'username', columnName: 'Username ', type: 'String', ordinable: true, filtrable: true},
      { key: 'fullName', columnName: 'Nome Completo', type: 'String', ordinable: true, filtrable: true},
      { key: 'email', columnName: 'Email', type: 'String', ordinable: true, filtrable: true},
      { key: 'role', columnName: 'Ruolo', type: 'String', ordinable: true, filtrable: true},
      { key: 'password', columnName: 'Password', type: 'String', ordinable: true, filtrable: true},
    ],
    currentByDefault: {key: 'id', orderby: 'asc'},
    pagination: {itemsPerPage: 10, currentPage: 1},
    actions: {
      actions: [
        {
          name:'Modifica',
          visible: (row: any) => true,
        },
        {
          name: 'Elimina',
          visible: (row: any) => true,
        }
       ]}
  };

  handleActionClick(action: string, data: any) {
    if (action === 'Modifica') {
      this.router.navigate(['/edit-user', data.id], {state: {userData: data}});
    }

    if (action === 'Elimina') {
      this.userService.deleteUser(data.id).subscribe({
        next: () => {
          console.log('Utente eliminato con successo');
          this.users = this.users.filter(user => user.id !== data.id);
        },
        error: (err) => {
          console.error('Errore durante l\'eliminazione dell\'utente:', err);
        }
      });
    }
  }
}
