import { Injectable } from '@angular/core';
import { HistoryQuery } from './history.query';
import { HistoryStore } from './history.store';
import { Storage } from '@ionic/storage';
import * as uuid from 'uuid';
import { TableService } from '../../table/state/table.service';
import { OrderItem } from '../../order/model';
import { HistoryItem } from '../model';
// import uuid = require('uuid');

@Injectable({ providedIn: 'root' })
export class HistoryService {

    STORAGE_KEY: string = 'HISTORY'

    constructor(
        private store: HistoryStore,
        private query: HistoryQuery,
        private storage: Storage,
    ) { }

    public addToHistory(order: OrderItem) {

        let historyItem: HistoryItem = Object.assign({}, order, {
            updatedAt: new Date(),
            items: order.items
        })


        this.store.add(historyItem, { prepend: true });
        //console.log(this.query.getAll());
        this.updateLocalStorage()

        // ****** Testing Local Storage ******
        // this.storage.get(this.STORAGE_KEY).then(resp => {
        //     console.log(resp);

        // })
    }

    public removeFromHistory(id) {
        this.store.remove(id);
        this.updateLocalStorage();
        this.storage.get(this.STORAGE_KEY).then(
            elem => {
                console.log(elem);

            }
        )
    }

    public selectHistory() {
        return this.query.selectAll()
    }

    public updateLocalStorage() {
        let historyState = this.query.getAll();
        this.storage.set(this.STORAGE_KEY, historyState);
    }
}
