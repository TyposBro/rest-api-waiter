import { Injectable } from '@angular/core';
import { MealStore, MealState } from './meal.store';
import { MealQuery } from './meal.query';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AkitaFilter, AkitaFiltersPlugin } from 'akita-filters-plugin';
import { Storage } from '@ionic/storage';
import { MealItem } from '../model';
import { Observable, of, throwError, from } from 'rxjs';
import { switchMap, tap, catchError, share } from 'rxjs/operators';
import { AppConfigService } from 'src/app/app-config.service';
import { TranslateService } from '@ngx-translate/core';
import { CartItem } from '../../cart/model';

@Injectable({ providedIn: 'root' })
export class MealService {

    private readonly STORAGE_KEY = 'MEAL';
    private readonly API_PATH = '/meals';

    private filter: AkitaFiltersPlugin<MealState, MealItem>;

    constructor(
        private store: MealStore,
        private query: MealQuery,
        private http: HttpClient,
        private storage: Storage,
        private appConfig: AppConfigService,
        private translate: TranslateService
    ) {
        this.filter = new AkitaFiltersPlugin<MealState, any>(this.query);
    }

    // General query
    public selectAll() {
        return this.query.selectAll();
    }

    public selectTotalCount() {
        return this.query.selectCount();
    }

    public setActive(item: MealItem) {
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
    public selectAllByFilters(): Observable<any> {
        // @ts-ignore zs it was not an hashMap with not asObject
        return this.filter.selectAllByFilters();
    }

    public selectCountByFilters() {
        // @ts-ignore zs 
        return this.filter.selectAllByFilters().pipe(
            switchMap(items => of(items.length))
        );
    }

    public setFilter(f: AkitaFilter<MealItem, MealState>): void {
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

    public selectFilters(): Observable<AkitaFilter<MealItem, MealState>[]> {
        return this.filter.selectFilters();
    }
    // *** End

    //
    public httpSync(): Observable<MealItem[]> {
        let errorMessage = this.translate.instant("MEAL.ERRORS.400");
        let url = this.appConfig.getConfig().apiUrl + this.API_PATH;
        return this.http.get<MealItem[]>(url).pipe(
            share(),
            tap(items => {
                this.store.set(items);
                this.storage.set(this.STORAGE_KEY, items);
            }),
            catchError(error => throwError(new HttpErrorResponse({ error: errorMessage })))
        );
    }

    public storageSync() {
        let errorMessage = this.translate.instant("MEAL.ERRORS.401");
        return from(this.storage.get(this.STORAGE_KEY)).pipe(
            share(),
            tap(items => {
                if (!!items && items.length > 0) {
                    this.store.set(items);
                }
            }),
            catchError(error => throwError(new Error(errorMessage)))
        )
    }


    private updateLocalStorage() {
        let mealState = this.query.getAll();
        this.storage.set(this.STORAGE_KEY, mealState);
    }

}