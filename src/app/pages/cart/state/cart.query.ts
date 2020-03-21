import { CartState, CartStore } from './cart.store';
import { QueryEntity, getEntityType, getIDType, QueryConfig, Order } from '@datorama/akita';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
@QueryConfig({})
export class CartQuery extends QueryEntity<CartState, getEntityType<CartState>, getIDType<CartState>> {
    constructor(protected store: CartStore) {
        super(store);
    }
}