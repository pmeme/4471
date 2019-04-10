import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'chrome-popup',
  templateUrl: './chrome-popup.component.html',
  styleUrls: ['./chrome-popup.component.scss']
})
export class ChromePopupComponent implements OnInit {

  constructor(
  ) {
    chrome.tabs.create({ active: true, url: chrome.extension.getURL('index.html#window') }, () => { console.log('created') });
  }

  ngOnInit() {
  }

}
