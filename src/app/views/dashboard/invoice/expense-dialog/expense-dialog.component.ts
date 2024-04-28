import { Component } from '@angular/core';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";
import {Enum, StatementRequest} from "../../../../common/model/models";
import {environment} from "../../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import {InvoiceStateDictionaryPipe} from "../../../../common/pipe/invoice-state-dictionary.pipe";
import {MatFormField, MatLabel, MatPrefix, MatSuffix} from "@angular/material/form-field";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect, MatSelectModule} from "@angular/material/select";
import {NgForOf, NgIf} from "@angular/common";
import {YearMonthPipe} from "../../../../common/pipe/year-month.pipe";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatInput} from "@angular/material/input";

class EnumForm {
  name: string | undefined
  description: string | undefined
}

@Component({
  selector: 'app-expense-dialog',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogTitle,
    MatButton,
    MatDialogActions,
    MatDialogClose,
    InvoiceStateDictionaryPipe,
    MatFormField,
    MatLabel,
    MatOption,
    MatSelect,
    NgForOf,
    YearMonthPipe,
    FormsModule,
    MatInput,
    MatPrefix,
    MatSuffix,
    ReactiveFormsModule,
    MatSelectModule,
    NgIf
  ],
  templateUrl: './expense-dialog.component.html',
  styleUrl: './expense-dialog.component.css'
})
export class ExpenseDialogComponent {
  statementTypes: Enum[] | undefined
  statementCategories: Enum[] | undefined

  installmentsOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

  expenseForm = new FormGroup({
    description: new FormControl<string>('', Validators.required),
    value: new FormControl<number>(0, Validators.required),
    type: new FormControl(EnumForm, Validators.required),
    installmentAmount: new FormControl<number>(0),
    category: new FormControl(EnumForm, Validators.required)
  })

  constructor(
    public dialogRef: MatDialogRef<ExpenseDialogComponent>,
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) {
    this.getTypes()
    this.getCategories()
  }

  onSubmitNewStatement() {
    const formValidator = this.expenseForm.value
    const statement: StatementRequest = {
      description: formValidator.description as string,
      category: formValidator.category?.name as string,
      value: formValidator.value as number,
      type: formValidator.type?.name as string,
      referenceMonth: localStorage.getItem("currentReferenceMonth") as string
    }

    if (formValidator.installmentAmount != 0) {
      statement.installmentAmount = formValidator.installmentAmount as number
    }

    this.http.post(environment.apiUrl.concat(`/statements`), statement)
      .subscribe(
        (response) => {
          window.location.reload()
          this.snackBar.open('Despesa criada com sucesso', 'Close', {
            duration: 3000
          });
        },
        (error) => {
          this.snackBar.open('Erro ao criar um nova despesa', 'Close', {
            duration: 3000,
          });
        }
      );
  }

  private getTypes() {
    this.http.get<Enum[]>(environment.apiUrl.concat(`/statements/types`))
      .subscribe(
        (response) => {
          this.statementTypes = response
        },
        (error) => {
          this.snackBar.open('Error when trying load statement types', 'Close', {
            duration: 3000,
          });
        }
      );
  }

  private getCategories() {
    this.http.get<Enum[]>(environment.apiUrl.concat(`/statements/categories`))
      .subscribe(
        (response) => {
          this.statementCategories = response
        },
        (error) => {
          this.snackBar.open('Error when trying load statement categories', 'Close', {
            duration: 3000,
          });
        }
      );
  }
}
