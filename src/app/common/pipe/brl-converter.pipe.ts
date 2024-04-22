import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'brlConverter'
})
export class BrlConverterPipe implements PipeTransform {
  transform(value: number): String {
    return (value/100).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  }
}
