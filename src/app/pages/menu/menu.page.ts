import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { MenuItem } from './model';
import { MenuService } from './state/menu.service';
import { FormControl } from '@angular/forms';
import { MealService } from '../meal/state/meal.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { CartItem } from '../cart/model';
import { CartService } from '../cart/state/cart.service';
import { searchFilter } from 'akita-filters-plugin';

@Component({
  selector: 'menu-page',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit, OnDestroy {

  menuItems$: Observable<MenuItem[]>;
  syncSub: Subscription;

  searchControl = new FormControl();
  showSearchbar: boolean = false;

  constructor(
    public router: Router,
    private menuService: MenuService,
    private mealService: MealService,
    private cartService: CartService
  ) { }

  toggleSearchbar(action?: string) {
    if (action === 'clear') {
      this.mealService.removeFilter('general');
      this.searchControl.setValue('');
    }
    this.showSearchbar = !this.showSearchbar;
  }

  ngOnInit() {
    this.menuItems$ = this.menuService.selectAll();



    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe((inputStr: string) => {
      const menuSearch = this.cleanTxt(inputStr);
      if (menuSearch) {
        this.menuService.setFilter({
          id: 'menuSearch',
          value: menuSearch,
          order: 20,
          name: `" ${menuSearch} "`,
          predicate: entity => searchFilter(menuSearch, entity)
        });
      } else {
        this.menuService.removeFilter('menuSearch');
      }
    });
  }

  ngOnDestroy() {
    return (this.syncSub) ? this.syncSub.unsubscribe : null;
  }

  selectMenu(menuItem: MenuItem) {
    this.menuService.setActive(menuItem);
    this.router.navigateByUrl("/meal");
  }

  sync() {
    this.syncSub = this.menuService.httpSync().subscribe();
  }

  // selectMeal(cartItem: CartItem) {
  //   this.cartService.addToCart(cartItem);
  // }

  private cleanTxt(txt: string | number): string {
    return (!!txt) ? txt.toString().toLowerCase().trim().split(' ').filter(s => !!s).join(' ') : '';
  }

}
