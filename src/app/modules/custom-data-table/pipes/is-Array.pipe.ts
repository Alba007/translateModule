import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isArray'
})
export class IsArrayPipe implements PipeTransform {

  transform(object: any, args?: any): any {
    
    return Array.isArray(object);
  }

}
