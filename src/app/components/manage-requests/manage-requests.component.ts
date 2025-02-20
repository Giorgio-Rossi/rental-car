import { Component } from '@angular/core';
import { MOCK_REQUEST } from '../../mock-data/mock-requests';

@Component({
  selector: 'app-manage-requests',
  templateUrl: './manage-requests.component.html',
  styleUrls: ['./manage-requests.component.css']
})

export class ManageRequestsComponent {
  requests = MOCK_REQUEST;

  approveRequest(id: number) {
    const request = this.requests.find(r => r.id === id);
    if (request) {
      request.status = 'Approvata';
      alert(`Richiesta ${id} approvata!`);
    }
  }

  rejectRequest(id: number) {
    const request = this.requests.find(r => r.id === id);
    if (request) {
      request.status = 'Rifiutata';
      alert(`Richiesta ${id} rifiutata!`);
    }
  }
}