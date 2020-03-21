import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { HistoryItem } from '../model';

export interface HistoryState extends EntityState<HistoryItem> { }

@Injectable({ providedIn: 'root' })
@StoreConfig({
    name: 'history',
    resettable: true,
})
export class HistoryStore extends EntityStore<HistoryState, HistoryItem> {
    constructor() {
        super();
    }
}