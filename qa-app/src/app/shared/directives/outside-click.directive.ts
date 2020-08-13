import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appOutsideClick]'
})
export class OutsideClickDirective {
  @Output() appOutsideClick = new EventEmitter<void>();

  constructor(private elementRef: ElementRef) {
  }

  @HostListener('document:click', ['$event.target'])
  public onClick(target) {
    console.log(this.elementRef.nativeElement);
    const clickedInside = this.elementRef.nativeElement.contains(target);
    if (!clickedInside) {
      this.appOutsideClick.emit();
    }
  }
}
