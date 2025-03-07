import { NgFor, NgIf } from '@angular/common';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../service/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../interface/user.model.interface';
import { FormsModule } from '@angular/forms';
import { TitleCasePipe } from '@angular/common';
import { ButtonComponent } from "../button/button.component";
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-form-view-edit-users',
  imports: [FormsModule, NgIf, NgFor, ButtonComponent],
  templateUrl: './form-view-edit-users.component.html',
  styleUrl: './form-view-edit-users.component.css'
})

export class FormViewEditUsersComponent implements OnInit {
  userData!: User;
  roleOptions: string[] = ['ROLE_ADMIN', 'ROLE_CUSTOMER']; 

  userService = inject(UserService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  
  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id');
//    console.log('User ID: ', userId)

    this.route.paramMap.subscribe(params => {
        const userID = params.get('id');
        const navigationData = history.state.userData;
  
        if (navigationData) {
          this.userData = navigationData;
//          console.log('Dati utente ricevuti:', this.userData); 
          this.userData = { ...this.userData }; 
        } else {
//          console.log('Nessun dato utente trovato');
        }
      });
  }

  buttonConfig = [
    {label: 'Salva', action: () => this.saveUser()},
    {label: 'Chiudi', action: () => this.router.navigate(['/manage-users'])}
  ]

  capitalize(key: string): string {
    return key.replace(/\b\w/g, char => char.toUpperCase());
  }

  objectKeys(obj: any): string[] {
    return Object.keys(obj);
  }

  updateStatus(event: Event):void{
    const selectElement = event.target as HTMLSelectElement;
    this.userData.role = selectElement.value;
//    console.log('Ruolo aggiornato: ', this.userData.role)
//    console.log('Status passato come param: ', event.target)
  }

  saveUser(): void {
    if (this.userData) {
      this.userService.updateUser(this.userData).subscribe({
        next: (updatedUser) => {
//          console.log('Utente aggiornato con successo:', updatedUser);
          this.router.navigate(['/manage-users']);
        },
        error: (error: HttpErrorResponse) => {
          console.error('Errore durante l\'aggiornamento dell\'utente:', error.message);
        },
        complete: () => {
//          console.log('Operazione completata');
        }
      });
    }
  }
  
}
