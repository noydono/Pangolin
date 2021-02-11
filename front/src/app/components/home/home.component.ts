import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent {

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
        { title: 'Tu veux venir faire un tour ?', cols: 2, rows: 1 ,class:"bg-image-1" },
        { title: 'Rien de mieux que de bronzer', cols: 1, rows: 1 , class:"bg-image-2"},
        { title: 'Crossfit today!', cols: 1, rows: 2 , class:"bg-image-3"},
        { title: "Je suis bien chez moi xD", cols: 1, rows: 1 ,class:"bg-image-4"}
      ];
    })
  );

  constructor(private breakpointObserver: BreakpointObserver) {}
}
