import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'statementCategoriesDictionary'
})
export class StatementCategoriesDictionaryPipe implements PipeTransform {
  transform(category: string): string {
    if (category == "") return ""

    const categories = new Map([
      ["FOOD", "Alimentação"],
      ["TRANSPORTATION", "Transporte"],
      ["ENTERTAINMENT", "Entretenimento"],
      ["STREAMING", "Streaming"],
      ["ELECTRONICS", "Eletrônicos"],
      ["GAMES", "Jogos"],
      ["HEALTH", "Saúde"],
      ["UTILITIES", "Serviços públicos"],
      ["EDUCATION", "Educação"],
      ["SHOPPING", "Compras"],
      ["HOUSING", "Moradia"],
      ["TRAVEL", "Viagem"],
      ["PERSONAL_CARE", "Cuidados pessoais"],
      ["GIFTS", "Presentes"],
      ["BULLSHIT", "Besteirinhas"],
      ["OTHER", "Outros"]
    ]);

    return categories.get(category) ?? category;
  }
}
