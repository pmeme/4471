import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenavContainer, MatSidenav, MatDrawerToggleResult } from '@angular/material';
import { from } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  @ViewChild(MatSidenavContainer) private _container: MatSidenavContainer;
  @ViewChild(MatSidenav) private _sidenav: MatSidenav;
  sidenavState: MatDrawerToggleResult | null = 'open';

  constructor(
    public router: Router
  ) { }

  ngOnInit() {
  }

  public toggleSideNav(): void {
    this.sidenavState = null;
    from(this._sidenav.toggle()).subscribe((result: MatDrawerToggleResult) => {
      this.sidenavState = result;
    });
  }
}
