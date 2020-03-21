import { Component, OnInit, OnDestroy, LOCALE_ID, Inject, EventEmitter } from '@angular/core';
//import { AuthService } from '../auth/state/auth.service';
import { Router } from '@angular/router';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {

  selectedLanguage: string;
  langChangeSub: Subscription;

  constructor(
    //public authService: AuthService,
    private translate: TranslateService,
    public router: Router
  ) {

    this.selectedLanguage = this.translate.getDefaultLang();
  }



  ngOnInit() {
    this.langChangeSub = this.translate.onDefaultLangChange.subscribe((langObj) => {

    })
  }

  ngOnDestroy() {
    this.langChangeSub.unsubscribe();
  }

  languageChanged() {
    console.log(this.selectedLanguage);
    this.translate.resetLang(this.selectedLanguage);
    this.translate.setDefaultLang(this.selectedLanguage);
    this.translate.use(this.selectedLanguage);
  }
}
