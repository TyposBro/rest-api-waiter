import { Injectable } from '@angular/core';
import { CartQuery } from './cart.query';
import { CartStore } from './cart.store';
import { Observable, of, from, Subscribable, Subscription } from 'rxjs';
import { CartItem } from '../model';
import { MealItem } from '../../meal/model';

@Injectable({ providedIn: 'root' })
export class CartService {


    constructor(
        private store: CartStore,
        private query: CartQuery
    ) { }

    // General query
    public selectAll(): Observable<CartItem[]> {
        return this.query.selectAll();
    }

    public reset() {
        return this.store.reset()
    }

    public selectTotalCount() {
        return this.query.selectCount();
    }
    // ******* Testing ******* 
    public selectTotalCost(): Observable<any> {
        let items$ = this.selectAll();
        let total;
        items$.subscribe(
            elem => {
                let result: number = 0
                for (let index = 0; index < elem.length; index++) {
                    result = result + elem[index].total;
                }
                total = result
            }
        ).unsubscribe()
        return of(total)
    }
    // ******* Testing ******* 

    public addToCart(cartItem: MealItem & CartItem) {
        // remove existing meal completely to add the same meal with new quantity
        const hasItem = this.query.getEntity(cartItem.mealId);
        if (hasItem) {
            this.store.remove(cartItem.mealId)
        }

        this.store.add(cartItem, { prepend: true });
        console.log(this.query.getAll())
        // this.store.
    }


    remove(id: any) {
        this.store.remove(id)
    }

}