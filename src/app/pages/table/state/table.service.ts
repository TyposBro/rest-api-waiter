import { Injectable } from '@angular/core';
import { TableStore, TableState } from './table.store';
import { TableQuery } from './table.query';
import { HttpClient } from '@angular/common/http';
import { AkitaFilter, AkitaFiltersPlugin } from 'akita-filters-plugin';
import { Storage } from '@ionic/storage';
import { TableItem } from '../model';
import { Observable, of, throwError } from 'rxjs';
import { switchMap, tap, catchError } from 'rxjs/operators';
import { AppConfigService } from 'src/app/app-config.service';

@Injectable({ providedIn: 'root' })
export class TableService {

    private readonly STORAGE_KEY = 'TABLE';
    private readonly API_PATH = '/tables';

    private filter: AkitaFiltersPlugin<TableState, TableItem>;

    constructor(
        private store: TableStore,
        private query: TableQuery,
        private http: HttpClient,
        private storage: Storage,
        private appConfig: AppConfigService
    ) {
        this.filter = new AkitaFiltersPlugin<TableState, any>(this.query);
    }



    // General query
    public selectAll() {
        return this.query.selectAll();
    }

    public selectTotalCount() {
        return this.query.selectCount();
    }

    public setActive(item: TableItem) {
        this.store.setActive(item.id);
        this.updateLocalStorage();
    }

    public getActive() {
        return this.query.getActive();
    }

    public getActiveTableId() {
        return this.query.getActiveId()
    }


    // public getActiveTableId() {
    //     //return this.selectActive();
    //     let tableId: string;
    //     this.query.selectActive(entity => {
    //         entity.id
    //     console.log(entity.id)})
    //         .subscribe(
    //             (elem: any) => { 
    //                 console.log(elem); 
    //             return elem},
    //             error => { }
    //         )
    //     return
    // }
    // End

    // Filter settings
    public selectAllByFilters(): Observable<TableItem[]> {
        // @ts-ignore zs it was not an hashMap with not asObject
        return this.filter.selectAllByFilters();
    }

    public selectCountByFilters() {
        // @ts-ignore zs 
        return this.filter.selectAllByFilters().pipe(
            switchMap(items => of(items.length))
        );
    }

    public setFilter(f: AkitaFilter<TableItem, TableState>): void {
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

    public selectFilters(): Observable<AkitaFilter<TableItem, TableState>[]> {
        return this.filter.selectFilters();
    }
    // *** End

    // http
    public httpLoad(): Observable<TableItem[]> {
        let url = this.appConfig.getConfig().apiUrl + this.API_PATH;
        console.log(url);

        return this.http.get<TableItem[]>(url).pipe(
            tap(items => {
                this.store.set(items);
                this.storage.set(this.STORAGE_KEY, items);
            }),
            catchError(error => throwError(error))
        );
    }

    // http
    public confirm(tableItem: TableItem) {
        let postData = Object.assign({}, tableItem, {
            status: 'occupied'
        });

        let url = this.appConfig.getConfig().apiUrl + this.API_PATH;
        return this.http.post<any>(url, tableItem).pipe(
            switchMap(() => {
                return this.httpLoad()
            }),
            catchError(error => throwError(error))
        )
    }



    private updateLocalStorage() {
        let tableState = this.query.getAll();
        this.storage.set(this.STORAGE_KEY, tableState);
    }
}