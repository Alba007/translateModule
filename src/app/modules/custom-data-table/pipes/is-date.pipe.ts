import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment-timezone/builds/moment-timezone-with-data-2012-2022.min';

@Pipe({
  name: 'isDate'
})
export class IsDatePipe implements PipeTransform {

  transform(date: any, args?: any): any {
    // console.log('dataaa', date);



    let formats = [
      moment.ISO_8601,
      "MM/DD/YYYY    HH*mm*ss"
    ];
    
    return moment(date, formats, true).isValid();
    // return moment.unix(date).format('dddd, MMMM Do, YYYY h:mm:ss A').isDate();

  }

}
