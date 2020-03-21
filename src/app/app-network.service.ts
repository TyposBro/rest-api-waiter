//https://forum.ionicframework.com/t/ionic-4-network-check-example-problem/157909/2
import { Injectable } from '@angular/core';
import { Network } from '@ionic-native/network/ngx';
import { Platform } from '@ionic/angular';
import { Observable, merge, of, fromEvent } from 'rxjs';
import { mapTo, debounceTime } from 'rxjs/operators';

Injectable({ providedIn: 'root' })
export class AppNetworkService {

    private online$: Observable<boolean> = undefined;

    constructor(private network: Network, private platform: Platform) { 
        
        this.online$ = Observable.create(observer => {
            observer.next(true);
        }).pipe(mapTo(true));
        
        if( this.platform.is('cordova') ) {
            // on Device
            this.online$ = merge(
                this.network.onConnect().pipe(mapTo(true)),
                this.network.onDisconnect().pipe(mapTo(false))
            );
        } else {
            // on Browser
            this.online$ = merge(
                of(navigator.onLine),
                fromEvent(window, 'online').pipe(mapTo(true)),
                fromEvent(window, 'offline').pipe(mapTo(false))
            );
        }
        
    }

    public getNetworkType(): string {
        return this.network.type;
    }

    public getNetworkStatus(): Observable<boolean> {
        return this.online$.pipe(debounceTime(500));
    }
}