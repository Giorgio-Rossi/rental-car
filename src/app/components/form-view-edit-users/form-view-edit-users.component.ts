import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../service/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../interface/user.model.interface';
import { FormsModule } from '@angular/forms';
import { TitleCasePipe } from '@angular/common';
import { ButtonComponent } from "../button/button.component";

@Component({
  selector: 'app-form-view-edit-users',
  imports: [FormsModule, NgIf, NgFor, ButtonComponent],
  templateUrl: './form-view-edit-users.component.html',
  styleUrl: './form-view-edit-users.component.css'
})

export class FormViewEditUsersComponent implements OnInit {
  userData!: User;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id');
    console.log('User ID: ', userId)

    this.route.paramMap.subscribe(params => {
        const userID = params.get('id');
        const navigationData = history.state.userData;
  
        if (navigationData) {
          this.userData = navigationData;
          console.log('Dati utente ricevuti:', this.userData); 
          this.userData = { ...this.userData }; 
        } else {
          console.log('Nessun dato utente trovato');
        }
      });
  }

  buttonConfig = [
    {label: 'Salva', action: () => console.log('Azione di salvataggio')},
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
    console.log('Ruolo aggiornato: ', this.userData.role)
    console.log('Status passato come param: ', event.target)
  }

}
