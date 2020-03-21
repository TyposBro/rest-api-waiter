import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { MenuItem } from '../model';

export interface MenuState extends EntityState<MenuItem> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'menu', resettable: true })
export class MenuStore extends EntityStore<MenuState, MenuItem> {
    constructor() {
        super();
    }
}