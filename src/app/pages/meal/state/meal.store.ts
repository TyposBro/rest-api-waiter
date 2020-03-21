import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { MealItem } from './../model';

export interface MealState extends EntityState<MealItem> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'meal', resettable: true })
export class MealStore extends EntityStore<MealState, MealItem> {
    constructor() {
        super();
    }
}