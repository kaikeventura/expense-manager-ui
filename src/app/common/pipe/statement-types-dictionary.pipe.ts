import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'statementTypesDictionary'
})
export class StatementTypesDictionaryPipe implements PipeTransform {
  transform(type: string): string {
    if (type == "") return ""

    const types = new Map([
      ["CREDIT_CARD", "Cartão de crédito"],
      ["FIXED", "Fixo"],
      ["IN_CASH", "À vista"]
    ]);

    return types.get(type) ?? type;
  }
}
