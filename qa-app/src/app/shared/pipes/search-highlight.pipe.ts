import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchHighlight'
})
export class SearchHighlightPipe implements PipeTransform {

  transform(value: any, ...args: any): any {
    if (!args) {
      return value;
    }

    const re = new RegExp(args, 'gi');
    return value.replace(re, (str) => `<mark>${str}</mark>`);
  }

}
