import { Pipe, PipeTransform } from '@angular/core';
import moment from 'moment';

@Pipe({
  standalone: true,
  name: 'localDateTime'
})
export class LocalDateTimePipe implements PipeTransform {
  transform(date: string): string {
    if (date == "") return ""
    let dateOut: moment.Moment = moment(date, "YYYY-MM-DD HH:mm:ss")
    return dateOut.format("DD/MM/YYYY HH:mm");
  }
}
