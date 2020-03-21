import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { TranslateService } from '@ngx-translate/core';
import { AppInitService } from './app-init.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private translate: TranslateService,
    private initService: AppInitService,

    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {

      this.translate.setDefaultLang('uz');
      this.translate.use('uz');

      this.initService.httpLoad().subscribe(([a, b, c]) => {
        //console.log([a, b, c])
      })

      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
