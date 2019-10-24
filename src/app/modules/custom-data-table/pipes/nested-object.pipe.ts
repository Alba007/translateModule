import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nestedObject',
  pure: true
})
export class NestedObjectPipe implements PipeTransform {

  // transform(value: any, args?: any): any {
  //   return null;
  // }
  transform( object: any, path: string): any {
    // console.log('pipe', object);
    // console.log('path', path);
    
    const attrArray = path ? path.split('.') : [];
    let result: any = object;
    attrArray.forEach(attr => {
      // console.log('atribute', attr);
      if(result && result instanceof Object) {
        result = result[attr];
      }
    });
    return (result !== '') ? result : null;
}

}

