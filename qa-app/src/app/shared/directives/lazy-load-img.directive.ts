import { AfterViewInit, Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appLazyLoadImg]'
})
export class LazyLoadImgDirective implements AfterViewInit {

  constructor(private elementRef: ElementRef) {
  }

  ngAfterViewInit(): void {
    const onIntersection = (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          console.log(entry);
        }
      }
    };

    const observer = new IntersectionObserver(onIntersection);
    observer.observe(this.elementRef.nativeElement);
  }
}
