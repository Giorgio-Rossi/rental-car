import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { ButtonComponent } from "../button/button.component";
import { ButtonConfig } from '../button/button-config.interface';
import { CarRequestService } from '../../service/CarRequest.service';
import { CarRequest } from '../../interface/CarRequest.model.interface';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-requests',
  imports: [NgFor, ButtonComponent],
  templateUrl: './manage-requests.component.html',
  styleUrls: ['./manage-requests.component.css']
})

export class ManageRequestsComponent implements OnInit {
  requestsCar: CarRequest[] = [];  
 
  constructor(private requestService: CarRequestService, private authService: AuthService, private router: Router){}

  ngOnInit(): void {
    this.requestService.getRequests().subscribe(requests => {
      this.requestsCar = requests;
    });

    const userRole = this.authService.getUserType(); 
    if (userRole !== 'Admin') {
      this.router.navigate(['/home']);
    }
  }


  buttonConfigs: ButtonConfig[] = [
    { 
      label: 'Approva', 
      action: (id: number) => this.approveRequest(id), 
      type: 'button', 
      style: {
        color: 'white',
        backgroundColor: 'green',
        border: '1px solid green'
      }
    },
    { 
      label: 'Rifiuta', 
      action: (id: number) => this.rejectRequest(id), 
      type: 'button', 
      disabled: false, 
      style: {
        color: 'white',
        backgroundColor: 'red',
        border: '1px solid red'
      }
    }
  ];
  
  approveRequest(id: number): void {
    console.log('id request: ', id);
    const request = this.requestsCar.find(r => r.id === id);
    if (request) {
      this.requestService.updateRequestStatus(id, 'Approvata').subscribe(updatedRequest => {
        request.status = updatedRequest!.status;  
        alert(`Richiesta ${id} approvata!`);
      });
    }
  }

  rejectRequest(id: number): void {
    console.log('id request: ', id);
    const request = this.requestsCar.find(r => r.id === id);
    if (request) {
      this.requestService.updateRequestStatus(id, 'Rifiutata').subscribe(updatedRequest => {
        request.status = updatedRequest!.status;  
        alert(`Richiesta ${id} rifiutata!`);
      });
    }
  }
}