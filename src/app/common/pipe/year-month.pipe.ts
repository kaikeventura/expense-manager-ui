import { Pipe, PipeTransform } from '@angular/core';
import moment from 'moment';

@Pipe({
  standalone: true,
  name: 'yearMonth'
})
export class YearMonthPipe implements PipeTransform {
  transform(yearMonth: string): string {
    if (yearMonth == "") return ""
    let dateOut: moment.Moment = moment(yearMonth, "YYYY-MM")
    return dateOut.locale("pt-br").format("MMMM/YYYY");
  }
}
