import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { OrderItem } from '../model';

export interface OrderState extends EntityState<OrderItem> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'order', resettable: true })
export class OrderStore extends EntityStore<OrderState, OrderItem> {
    constructor() {
        super();
    }
}