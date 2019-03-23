import { Component, OnInit } from '@angular/core';
import { PwndService } from '../services/pwnd.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public breaches = [];

  constructor(private _pwndService: PwndService) { }

  ngOnInit() {
    this._pwndService.getAccountBreaches("mralawi7@gmail.com")
      .subscribe(data => this.breaches = data);    
  }





}
