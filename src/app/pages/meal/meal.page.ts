import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription, combineLatest, of } from 'rxjs';
import { MealItem } from './model';
import { MealService } from './state/meal.service';
import { MenuService } from '../menu/state/menu.service';
import { OrderService } from '../order/state/order.service';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { searchFilter } from 'akita-filters-plugin';
import { CartService } from '../cart/state/cart.service';
import { CartItem } from '../cart/model';

@Component({
  selector: 'meal-page',
  templateUrl: './meal.page.html',
  styleUrls: ['./meal.page.scss'],
})
export class MealPage implements OnInit, OnDestroy {


  mealItems$: Observable<MealItem[]>;

  searchControl = new FormControl();
  showSearchbar: boolean = false;

  syncSub: Subscription;

  constructor(
    private mealService: MealService,
    private menuService: MenuService,
    private orderService: OrderService,
    private cartService: CartService
  ) { }

  toggleSearchbar(action?: string) {
    if (action === 'clear') {
      this.mealService.removeFilter('search');
      this.searchControl.setValue('');
    }
    this.showSearchbar = !this.showSearchbar;
  }


  ionViewWillEnter() {
    // Filter based on selected Menu
    const menuItem: any = this.menuService.getActive();
    if (!!menuItem && menuItem.id) {
      let menuId = menuItem.id;
      this.mealService.setFilter({
        id: "menuId",
        value: menuId,
        predicate: entity => entity.menuId === menuId
      });
    }


    this.mealItems$ = this.combineLatest();


    //this.mealItems$ = this.mealService.selectAllByFilters();
    // this.mealItems$.subscribe(
    //   elem => {
    //     for (let index = 0; index < elem.length; index++) {
    //       console.log(elem[index]);

    //     }
    //   })





    // let foo = 10000;
    // this.mealService.setFilter({
    //   id: "narxi",
    //   value: foo,
    //   predicate: enty => enty.price < foo
    // })



    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe((inputStr: string) => {
      const search = this.cleanTxt(inputStr);
      if (search) {
        this.mealService.setFilter({
          id: 'qidiruv',
          value: search,
          order: 20,
          name: `" ${search} "`,
          predicate: entity => searchFilter(search, entity)
        });
      } else {
        this.mealService.removeFilter('qidiruv');
      }
    });
  }

  ionViewWillLeave() {
    this.mealService.removeAll();
    return (this.syncSub) ? this.syncSub.unsubscribe : null;
  }

  ngOnInit() { }

  ngOnDestroy() { }

  selectMeal(item: MealItem & CartItem) {
    this.cartService.addToCart(item);
  }

  sync() {
    this.syncSub = this.mealService.httpSync().subscribe();
  }

  combineLatest(): Observable<MealItem[]> {
    return combineLatest(
      this.mealService.selectAllByFilters(),
      this.cartService.selectAll()
    ).pipe(
      switchMap(([mealItems, cartItems]) => {

        let result = [];
        // let cartIds = cartItems.map(item => item.mealId);
        mealItems.forEach(mealItem => {
          let _cartItem = cartItems.find(cartItem => cartItem.mealId === mealItem.id);
          if (_cartItem) {
            result.push(Object.assign({}, mealItem, _cartItem));
          } else {
            result.push(mealItem);
          }
        });
        //console.log('!!!!!' + result);

        return of(result);
      })
    )
  }



  private cleanTxt(txt: string | number): string {
    return (!!txt) ? txt.toString().toLowerCase().trim().split(' ').filter(s => !!s).join(' ') : '';
  }

}
