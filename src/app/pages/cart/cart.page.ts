import { Component, OnInit, OnDestroy } from '@angular/core';
import { FooterRowOutlet } from '@angular/cdk/table';
import { CartService } from './state/cart.service';
import { Observable, Subscription } from 'rxjs';
import { CartItem } from './model';
import { MealItem } from '../meal/model';
import { PopoverController, ModalController, AlertController } from '@ionic/angular';
import { ProductViewComponent } from './product-view/product-view.component';
import { Router } from '@angular/router';
import { HistoryStore } from '../history/state/history.store';
import { HistoryService } from '../history/state/history.service';
import { OrderService } from '../order/state/order.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit, OnDestroy {


  cartItems$: Observable<CartItem[]>;
  total$: Observable<number>
  // total;
  constructor(
    private cartService: CartService,
    private popoverController: PopoverController,
    private router: Router,
    private orderSerivce: OrderService,
    private alertController: AlertController,
    private translate: TranslateService,

  ) { }

  ionViewWillEnter() {

    this.cartItems$ = this.cartService.selectAll();
    this.total$ = this.cartService.selectTotalCost()

    // this.cartService.selectTotalCost().subscribe(
    //   elem => {
    //     console.log(elem);

    //   }
    // )
    // this.cartItems$.subscribe(
    //   elem => {
    //     for (let index = 0; index < elem.length; index++) {
    //       console.log(elem[index]);
    //     }
    //   }
    // )
  }

  ngOnInit() {
    //   this.cartItems$ = this.cartService.selectAll();
  }
  ngOnDestroy(): void {
    // this.total.unsubscribe()
  }


  onCartEdit(cartItem: (MealItem & CartItem)) {
    this.present(cartItem);
  }


  onCartDelete({ id }: (MealItem & CartItem)) {
    this.cartService.remove(id);
    this.total$ = this.cartService.selectTotalCost()

  }

  async onCartSubmit(items, total) {
    const alert = await this.alertController.create({
      header: this.translate.instant('CART.COMPLETE'),
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.orderSerivce.addOrder(items, total);
            this.cartService.reset();
            this.router.navigateByUrl('/order');
          }
        },
        {
          text: this.translate.instant('CART.CANCEL'),
          role: 'cancel'
        }
      ]
    });

    await alert.present();
  }

  async presentAlert(items) {
    const alert = await this.alertController.create({
      header: this.translate.instant('CART.ACTIONS'),
      buttons: [
        {
          text: this.translate.instant('CART.CLEAR'),
          handler: () => {
            this.cartService.reset();
            this.router.navigateByUrl('/menu')
          }
        },
        // ****** Needs Improvement
        // {
        //   text: this.translate.instant('CART.COMPLETE_NOW'),
        //   handler: () => {
        //     this.historyService.addToHistory(items)
        //     this.cartService.reset();
        //     this.router.navigateByUrl('/home')
        //   }
        // },
        {
          text: this.translate.instant('CART.CANCEL'),
          role: 'cancel'
        }
      ]
    });

    await alert.present();
  }

  async present(product: (MealItem & CartItem)) {
    console.log(product)
    const popover = await this.popoverController.create({
      component: ProductViewComponent,
      componentProps: {
        product
      }
    });

    popover.onDidDismiss().then((product) => {
      this.total$ = this.cartService.selectTotalCost();
      if (product.data.quantity === 0) {
        console.log(product.data.quantity);

        this.onCartDelete(product.data.id)
      }

    })

    return await popover.present();
  }


}
