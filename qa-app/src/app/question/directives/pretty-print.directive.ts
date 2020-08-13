import {
  AfterViewInit,
  ComponentFactoryResolver,
  Directive,
  ElementRef,
  EmbeddedViewRef,
  Renderer2,
  ViewContainerRef,
  ɵmarkDirty as markDirty, ɵdetectChanges as detectChanges, ChangeDetectorRef
} from '@angular/core';
import hljs from 'highlight.js';
import javascript from 'highlight.js/lib/languages/javascript';
import typescript from 'highlight.js/lib/languages/typescript';
import { FileCopyButtonComponent } from '../file-copy-button/file-copy-button.component';

declare var PR;

@Directive({
  selector: '[appPrettyPrint]'
})
export class PrettyPrintDirective implements AfterViewInit {

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private cfr: ComponentFactoryResolver,
    private vcr: ViewContainerRef,
    private cdr: ChangeDetectorRef
  ) {
    const data = `let sayi = 150;`;
    const result = hljs.highlightAuto(data, ['typescript', 'javascript', 'css', 'html']).language;
  }

  ngAfterViewInit(): void {
    const factory = this.cfr.resolveComponentFactory(FileCopyButtonComponent);
    const NODES = (this.elementRef.nativeElement as HTMLDivElement).querySelectorAll('PRE');
    NODES.forEach(node => {
      const DIV = this.renderer.createElement('DIV');
      DIV.classList.add('pre-container');
      const compRef = this.vcr.createComponent(factory);
      const hostView = compRef.hostView as EmbeddedViewRef<any>;
      DIV.appendChild(hostView.rootNodes[0]);
      const cloneNode = node.cloneNode(true);
      DIV.appendChild(cloneNode);
      node.replaceWith(DIV);
      this.cdr.detectChanges();
    });
  }

}
