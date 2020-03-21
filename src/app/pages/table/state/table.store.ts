import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { TableItem } from '../model';

export interface TableState extends EntityState<TableItem> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'table', resettable: true })
export class TableStore extends EntityStore<TableState, TableItem> {
    constructor() {
        super();
    }
}