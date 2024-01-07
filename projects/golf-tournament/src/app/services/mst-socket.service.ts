import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';
import { GolfPlayerData } from '../shared/interfaces/golf-player-data.interface';

@Injectable({
  providedIn: 'root'
})
export class MSTSocketService {
    private socket: Socket = io('https://mst-full-stack-dev-test.herokuapp.com/');
    receiveData(): Observable<GolfPlayerData> {
      return new Observable<GolfPlayerData>(observer => {
        this.socket.on('data-update', (data: GolfPlayerData) => {
          console.log('Received data from server:', data);
          observer.next(data);
        });
      });
    }
  }