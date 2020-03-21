import { MenuState, MenuStore } from './menu.store';
import { QueryEntity, getEntityType, getIDType, QueryConfig, Order } from '@datorama/akita';
import { Injectable } from '@angular/core';


@Injectable({ providedIn: 'root' })
@QueryConfig({
    sortBy: 'title',
    sortByOrder: Order.ASC
})
export class MenuQuery extends QueryEntity<MenuState, getEntityType<MenuState>, getIDType<MenuState>> {
    constructor(protected store: MenuStore) {
        super(store);
    }
}