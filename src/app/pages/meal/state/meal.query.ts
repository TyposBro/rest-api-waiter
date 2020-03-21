import { MealState, MealStore } from './meal.store';
import { QueryEntity, getEntityType, getIDType, QueryConfig, Order } from '@datorama/akita';
import { Injectable } from '@angular/core';


@Injectable({ providedIn: 'root' })
@QueryConfig({
    sortBy: 'title',
    sortByOrder: Order.ASC
})
export class MealQuery extends QueryEntity<MealState, getEntityType<MealState>, getIDType<MealState>> {
    constructor(protected store: MealStore) {
        super(store);
    }
}