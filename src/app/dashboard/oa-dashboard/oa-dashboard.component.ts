import { Component, OnInit, OnDestroy } from '@angular/core';
import { map } from 'rxjs/operators';
import {
  Breakpoints,
  BreakpointState,
  BreakpointObserver
} from '@angular/cdk/layout';
import { IRoute } from '../../model/i-route';

@Component({
  selector: 'oa-dashboard',
  templateUrl: './oa-dashboard.component.html',
  styleUrls: ['./oa-dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Card 1', cols: 1, rows: 1 },
          { title: 'Card 2', cols: 1, rows: 1 },
          { title: 'Card 3', cols: 1, rows: 1 },
          { title: 'Card 4', cols: 1, rows: 1 }
        ];
      }

      return [
        { title: 'Card 1', cols: 2, rows: 1 },
        { title: 'Card 2', cols: 1, rows: 1 },
        { title: 'Card 3', cols: 1, rows: 2 },
        { title: 'Card 4', cols: 1, rows: 1 }
      ];
    })
  );

  routeLink: IRoute[] = [];

  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit(): void {
    // Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    // Add 'implements OnInit' to the class.
  }

  ngOnDestroy(): void {
    // Called once, before the instance is destroyed.
    // Add 'implements OnDestroy' to the class.
  }
}
