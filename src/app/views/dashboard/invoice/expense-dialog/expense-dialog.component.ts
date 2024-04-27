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
import {MatSelect} from "@angular/material/select";
import {NgForOf} from "@angular/common";
import {YearMonthPipe} from "../../../../common/pipe/year-month.pipe";
import {FormGroup, FormsModule} from "@angular/forms";
import {MatInput} from "@angular/material/input";

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
    MatSuffix
  ],
  templateUrl: './expense-dialog.component.html',
  styleUrl: './expense-dialog.component.css'
})
export class ExpenseDialogComponent {
  statementTypes: Enum[] | undefined
  defaultType: Enum | undefined
  statementCategories: Enum[] | undefined
  defaultCategory: Enum | undefined

  installmentsAmount = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  defaultInstallmentAmount = 1

  form!: FormGroup
  formData: any = {};

  constructor(
    public dialogRef: MatDialogRef<ExpenseDialogComponent>,
    private http: HttpClient,
    private snackBar: MatSnackBar,
  ) {
    this.getTypes()
    this.getCategories()
  }

  onSubmitNewStatement() {
    const statement: StatementRequest = {
      description: this.formData.description,
      category: "",
      value: 1,
      installmentAmount: 1,
      type: "",
      referenceMonth: ""
    }
  }

  private getTypes() {
    this.http.get<Enum[]>(environment.apiUrl.concat(`/statements/types`))
      .subscribe(
        (response) => {
          this.statementTypes = response
          this.defaultType = response[0]
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
          this.defaultCategory = response[0]
        },
        (error) => {
          this.snackBar.open('Error when trying load statement categories', 'Close', {
            duration: 3000,
          });
        }
      );
  }
}
