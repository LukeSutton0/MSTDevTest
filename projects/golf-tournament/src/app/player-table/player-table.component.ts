import { Component, OnInit } from '@angular/core';
import { MSTSocketService } from '../services/mst-socket.service';
import { GolfPlayerData } from '../shared/interfaces/golf-player-data.interface';

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
      this.mstSocketService.receiveData().subscribe((data: GolfPlayerData) => {
      this.dataFromServer = data;
    });
  }
}
