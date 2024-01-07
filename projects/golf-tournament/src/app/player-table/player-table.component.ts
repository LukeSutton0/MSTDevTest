import { Component, OnInit } from '@angular/core';
import { MSTSocketService } from '../services/mst-socket.service';
import { GolfPlayerData } from '../shared/interfaces/golf-player-data.interface';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-player-table',
  standalone: true,
  imports: [NgFor],
  templateUrl: './player-table.component.html',
  styleUrl: './player-table.component.css'
})

export class PlayerTableComponent implements OnInit {
  playerData: GolfPlayerData[] = []; //list of playerdata objects
  pages: GolfPlayerData[][] = [[]]; //2d , each outer element = page
  currentPage = 0;
  pageSize = 10; //num of people per page
  maxPages = 10;
  constructor(private mstSocketService: MSTSocketService) {}
  ngOnInit() {
    this.mstSocketService.receiveData().subscribe((data: GolfPlayerData) => {
      this.playerData.unshift(data);
      this.displayData();
    });
  }

  displayData() {
    const currentPlayer = this.playerData[0];
    if (currentPlayer) {
      // Add the curr player to start of p1
      this.pages[0].unshift(currentPlayer);
      for (let i = 0; i < this.pages.length; i++) { //for each page
        if (this.pages[i].length > this.pageSize) { // if amount of people > 10
          const oldestPlayerOnPage = this.pages[i].pop(); // pop oldest
          if(oldestPlayerOnPage !== undefined && i + 1 < this.pages.length){
            this.pages[i + 1].unshift(oldestPlayerOnPage);
          }    
          else if(oldestPlayerOnPage !== undefined && this.pages.length < this.maxPages){
            const newPage: GolfPlayerData[] = [oldestPlayerOnPage];
            this.pages.push(newPage);
          }
        }
      }
    }
  }
  totalPages() {
    let calculatedPageNum = Math.ceil(this.playerData.length / this.pageSize)

    if(calculatedPageNum < 1){
      calculatedPageNum = 1
    }
    else if (calculatedPageNum > 10){
      calculatedPageNum = 10
    }
    return calculatedPageNum;
  }
  
  nextPage() {
    const totalPages = this.totalPages();
    if (this.currentPage < totalPages - 1) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
    }
  }

  currentPageData() {
    return this.pages[this.currentPage];
  }
}