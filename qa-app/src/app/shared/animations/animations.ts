import { animate, animation, style, transition, trigger } from '@angular/animations';

export const fadeInOutAnimation =
  trigger('fadeInOut', [
    transition(':enter', [
      style({opacity: 0, top: '-4px'}),
      animate(150, style({opacity: 1, top: '0px'}))
    ]),
    transition(':leave', [
      animate(150, style({opacity: 0, top: '-4px'}))
    ])
  ]);




