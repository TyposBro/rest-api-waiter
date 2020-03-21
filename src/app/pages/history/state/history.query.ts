import { HistoryState, HistoryStore } from './history.store';
import { QueryEntity, getEntityType, getIDType, QueryConfig, Order } from '@datorama/akita';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
@QueryConfig({})
export class HistoryQuery extends QueryEntity<HistoryState, getEntityType<HistoryState>, getIDType<HistoryState>> {
    constructor(protected store: HistoryStore) {
        super(store);
    }
}