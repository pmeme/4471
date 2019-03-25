import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Breach } from '../../services/models/breach';
import { Account } from '../../services/models/Account.model';

@Component({
  selector: 'view-breaches',
  templateUrl: './view-breaches.component.html',
  styleUrls: ['./view-breaches.component.scss']
})
export class ViewBreachesComponent implements OnInit {
  breaches: Breach[];
  account: Account;

  constructor(
    private _activatedRoute: ActivatedRoute
  ) {
    this._activatedRoute.data.subscribe((result: { breaches: Breach[], account: firebase.firestore.DocumentSnapshot }) => {
      this.breaches = result.breaches;
      this.account = <Account>result.account.data();
    });
  }

  ngOnInit() {
  }

}
