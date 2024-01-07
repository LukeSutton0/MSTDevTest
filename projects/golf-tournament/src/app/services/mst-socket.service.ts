import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MSTSocketService {
    private socket: Socket;
  
    constructor() {
      // Connect to the Socket.IO server
      this.socket = io('https://mst-full-stack-dev-test.herokuapp.com/');
    }
  
    // Receive data from the server
    receiveDataUpdate(): Observable<any> {
      return new Observable<any>(observer => {
        this.socket.on('data-update', (data: any) => {
          console.log('Received data from server:', data);
          observer.next(data);
        });
      });
    }
  }