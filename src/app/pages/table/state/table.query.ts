import { TableState, TableStore } from './table.store';
import { QueryEntity, getEntityType, getIDType, QueryConfig, Order } from '@datorama/akita';
import { Injectable } from '@angular/core';


@Injectable({ providedIn: 'root' })
@QueryConfig({
    sortBy: 'tableNumber',
    sortByOrder: Order.ASC
})
export class TableQuery extends QueryEntity<TableState, getEntityType<TableState>, getIDType<TableState>> {
    constructor(protected store: TableStore) {
        super(store);
    }
}