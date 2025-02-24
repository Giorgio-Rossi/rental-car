import { Component } from '@angular/core';
import { MOCK_REQUEST } from '../../mock-data/mock-requests';
import { NgFor } from '@angular/common';
import { ButtonComponent } from "../button/button.component";

@Component({
  selector: 'app-manage-requests',
  imports: [NgFor, ButtonComponent],
  templateUrl: './manage-requests.component.html',
  styleUrls: ['./manage-requests.component.css']
})

export class ManageRequestsComponent {
  requests = MOCK_REQUEST;

  buttonConfigs = [
    {label: 'Approva', action: (id: number) => this.approveRequest(id)},
    {label: 'Rifiuta', action: (id: number) => this.rejectRequest(id)}
  ]
  approveRequest(id: number) {
    console.log('id request: ', id)
    const request = this.requests.find(r => r.id === id);
    if (request) {
      request.status = 'Approvata';
      alert(`Richiesta ${id} approvata!`);
    }
  }

  rejectRequest(id: number) {
    console.log('id request: ', id)
    const request = this.requests.find(r => r.id === id);
    if (request) {
      request.status = 'Rifiutata';
      alert(`Richiesta ${id} rifiutata!`);
    }
  }
}