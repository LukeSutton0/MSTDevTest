import { Component, OnInit } from '@angular/core';
import { MSTSocketService } from '../services/mst-socket.service';

@Component({
  selector: 'app-player-table',
  standalone: true,
  imports: [],
  templateUrl: './player-table.component.html',
  styleUrl: './player-table.component.css'
})
export class PlayerTableComponent implements OnInit {
  dataFromServer: any;
  constructor(private mstSocketService: MSTSocketService) {}
  ngOnInit() {
    // Subscribe to the 'data-update' event
    this.mstSocketService.receiveDataUpdate().subscribe((data: any) => {
      this.dataFromServer = data;
      // Process the data as needed
    });
  }
}
