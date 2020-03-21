import { OrderState, OrderStore } from './order.store';
import { QueryEntity, getEntityType, getIDType, QueryConfig, Order } from '@datorama/akita';
import { Injectable } from '@angular/core';


@Injectable({ providedIn: 'root' })
@QueryConfig({
    // sortBy: 'title',
    // sortByOrder: Order.ASC
})
export class OrderQuery extends QueryEntity<OrderState, getEntityType<OrderState>, getIDType<OrderState>> {
    constructor(protected store: OrderStore) {
        super(store);
    }
}