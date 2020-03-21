import { Component, OnInit } from '@angular/core';
import { HistoryService } from './state/history.service';
import { Observable } from 'rxjs';
import { HistoryItem } from './model';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {

  historyItems$: Observable<HistoryItem[]>

  constructor(
    private historyService: HistoryService
  ) { }

  ngOnInit() {
    this.sync()
  }

  sync() {
    this.historyItems$ = this.historyService.selectHistory()
  }

  onHistoryDelete(historyItem: HistoryItem) {
    const id = historyItem.id;
    this.historyService.removeFromHistory(id)
  }
}
