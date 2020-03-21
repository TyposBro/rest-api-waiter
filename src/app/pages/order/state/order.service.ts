import { Injectable } from '@angular/core';
import { OrderStore, OrderState } from './order.store';
import { OrderQuery } from './order.query';
import { HttpClient } from '@angular/common/http';
import { AkitaFilter, AkitaFiltersPlugin } from 'akita-filters-plugin';
import { Storage } from '@ionic/storage';
import { OrderItem } from '../model';
import { Observable, of, throwError } from 'rxjs';
import { switchMap, tap, catchError } from 'rxjs/operators';
import { AppConfigService } from 'src/app/app-config.service';
import { TableService } from '../../table/state/table.service';
import * as uuid from 'uuid';

@Injectable({ providedIn: 'root' })
export class OrderService {

    private readonly STORAGE_KEY = 'ORDER';
    private readonly API_PATH = '/order';

    private filter: AkitaFiltersPlugin<OrderState, OrderItem>;

    constructor(
        private store: OrderStore,
        private query: OrderQuery,
        private http: HttpClient,
        private storage: Storage,
        private appConfig: AppConfigService,
        private tableService: TableService
    ) {
        this.filter = new AkitaFiltersPlugin<OrderState, any>(this.query);
    }


    public addItem(item: OrderItem) {
        this.store.add(item, { prepend: true });
        this.updateLocalStorage();
    }

    public removeItem(item: OrderItem) {
        this.store.remove(item.id);
        this.updateLocalStorage();
    }

    addOrder(items, total) {
        let activeOrder = Object.assign({}, this.query.getActive(), {
            totalCost: total,
            items: items
        });
        let active = this.query.getActiveId();
        this.store.update(active, activeOrder);
        this.updateLocalStorage();


        console.log(this.query.getAll());


        // ****** Testing Local Storage ******
        //     this.storage.get(this.STORAGE_KEY).then(resp => {
        //         console.log(resp);

        //     })
    }

    // General query
    public selectAll() {
        return this.query.selectAll();
    }

    public selectTotalCount() {
        return this.query.selectCount();
    }

    public setActive(item: OrderItem) {
        this.store.setActive(item.id);
        this.updateLocalStorage();
    }

    public getActive() {
        return this.query.getActive();
    }

    public selectActive() {
        return this.selectActive();
    }
    // End

    // Filter settings
    public selectAllByFilters(): Observable<OrderItem[]> {
        // @ts-ignore zs it was not an hashMap with not asObject
        return this.filter.selectAllByFilters();
    }

    public selectCountByFilters() {
        // @ts-ignore zs 
        return this.filter.selectAllByFilters().pipe(
            switchMap(items => of(items.length))
        );
    }

    public setFilter(f: AkitaFilter<OrderItem, OrderState>): void {
        this.filter.setFilter(f);
    }

    public removeFilter(id: string) {
        this.filter.removeFilter(id);
    }

    public removeAll() {
        this.filter.clearFilters();
    }

    public getFilterValue(id: string): any | null {
        return this.filter.getFilterValue(id);
    }

    public selectFilters(): Observable<AkitaFilter<OrderItem, OrderState>[]> {
        return this.filter.selectFilters();
    }
    // *** End

    //
    public httpLoad(): Observable<OrderItem[]> {
        let url = this.appConfig.getConfig().apiUrl + this.API_PATH;
        return this.http.get<OrderItem[]>(url).pipe(
            tap(items => {
                this.store.set(items);
                this.storage.set(this.STORAGE_KEY, items);
            }),
            catchError(error => throwError(error))
        );
    }


    private updateLocalStorage() {
        let orderState = this.query.getAll();
        this.storage.set(this.STORAGE_KEY, orderState);
    }

}