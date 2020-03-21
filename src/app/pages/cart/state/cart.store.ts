import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { CartItem } from '../model';

export interface CartState extends EntityState<CartItem> { }

@Injectable({ providedIn: 'root' })
@StoreConfig({
    name: 'cart',
    resettable: true,
    idKey: "mealId"
})
export class CartStore extends EntityStore<CartState, CartItem> {
    constructor() {
        super();
    }
}