import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'key'
})
export class KeyPipe implements PipeTransform {

  transform(value: any, args: any): any {
    //   console.log('rigers', value);
    //   console.log('oleeeeeeeeeee', args);

    let keys = [];

    for (let key in value) {
      // let keys: any ={} ;
      // let keys = []
      keys.push({ key: key, value: value[key] });

      // keys.key = key;
      // keys.value = value[key]
      // console.log(keys);

      // keys.value = value;

      // return keys;
    }
    // console.log(keys)

    return keys;

  }

}

