import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterSearch'
})
export class FilterPipe implements PipeTransform {

  transform(value: any[], filterSearch: string, prop: string): any[] {
    if (Array.isArray(value) && filterSearch) {
      const searchVal = new RegExp(filterSearch, 'i');
      return value.filter((el) => searchVal.test(el[prop]));
    }
    return Array.isArray(value) ? value : [];
  }

}
