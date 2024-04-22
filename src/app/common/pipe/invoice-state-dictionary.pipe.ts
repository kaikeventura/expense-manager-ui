import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'invoiceStateDictionary'
})
export class InvoiceStateDictionaryPipe implements PipeTransform {
  transform(state: string): string {
    if (state == "") return ""

    const statues = new Map([
      ["PREVIOUS", "Anterior"],
      ["CURRENT", "Atual"],
      ["FUTURE", "Futura"]
    ]);

    return statues.get(state) ?? state;
  }
}
