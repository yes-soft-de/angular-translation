import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  constructor(private translationService: TranslateService) { }

  ngOnInit() {
  }

  switchLanguage() {
    if (localStorage.getItem('lang')) {
      if (localStorage.getItem('lang') === 'en') {
        localStorage.setItem('lang', 'de');
        this.translationService.use('de');
      } else {
        localStorage.setItem('lang', 'en');
        this.translationService.use('en');
      }
    } else {
      localStorage.setItem('lang', 'en');
      this.translationService.use('en');
    }
  }
}
