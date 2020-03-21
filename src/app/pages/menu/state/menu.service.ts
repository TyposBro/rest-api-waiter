import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';
import { AkitaFilter, AkitaFiltersPlugin } from 'akita-filters-plugin';
import { from, Observable, of, throwError } from 'rxjs';
import { catchError, share, switchMap, tap } from 'rxjs/operators';
import { AppConfigService } from 'src/app/app-config.service';
import { MenuItem } from '../model';
import { MenuQuery } from './menu.query';
import { MenuState, MenuStore } from './menu.store';

@Injectable({ providedIn: 'root' })
export class MenuService {

    private readonly STORAGE_KEY = 'MENU';
    private readonly API_PATH = '/menu';

    private filter: AkitaFiltersPlugin<MenuItem, MenuState>;

    constructor(
        private store: MenuStore,
        private query: MenuQuery,
        private http: HttpClient,
        private storage: Storage,
        private appConfig: AppConfigService,
        private translate: TranslateService
    ) { }

    public selectAll() {
        return this.query.selectAll();
    }

    public selectTotalCount() {
        return this.query.selectCount();
    }

    public setActive(item: MenuItem) {
        this.store.setActive(item.id);
    }

    public getActive() {
        return this.query.getActive();
    }

    public selectActive() {
        return this.selectActive();
    }

    public httpSync(): Observable<MenuItem[]> {
        let errorMessage = this.translate.instant("MENU.ERRORS.400");
        let url = this.appConfig.getConfig().apiUrl + this.API_PATH;
        return this.http.get<MenuItem[]>(url).pipe(
            share(),
            tap(items => {
                this.store.set(items);
                this.updateLocalStorage();
            }),
            catchError(error => throwError(new HttpErrorResponse({ error: errorMessage })))
        );
    }

    public storageSync() {
        let errorMessage = this.translate.instant("MENU.ERRORS.401");
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
        let menuState = this.query.getAll();
        this.storage.set(this.STORAGE_KEY, menuState);
    }


    public setFilter(f: AkitaFilter<MenuItem, MenuState>): void {
        this.filter.setFilter(f);
    }
    public removeFilter(id: string) {
        this.filter.removeFilter(id);
    }
}