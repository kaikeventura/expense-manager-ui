import { Component } from '@angular/core';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatButton, MatFabButton} from "@angular/material/button";
import {Enum, StatementRequest, UserDetails} from "../../../../common/model/models";
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
import {MatIcon} from "@angular/material/icon";
import {NgxMaskDirective, provideNgxMask} from "ngx-mask";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";

class EnumForm {
  name: string | undefined
  description: string | undefined
}

class ProportionalityForm {
  name: string = ""
  email: string = ""
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
    NgIf,
    MatFabButton,
    MatIcon,
    NgxMaskDirective,
    MatSlideToggleModule
  ],
  providers: provideNgxMask(),
  templateUrl: './expense-dialog.component.html',
  styleUrl: './expense-dialog.component.css'
})
export class ExpenseDialogComponent {
  statementTypes: Enum[] | undefined
  statementCategories: Enum[] | undefined
  othersUsers: UserDetails[] | undefined
  isProportionalityExpense: boolean = false

  installmentsOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  proportionalityOptions = [10, 20, 30, 40, 50, 60, 70, 80, 90]

  expenseForm = new FormGroup({
    description: new FormControl<string>('', Validators.required),
    value: new FormControl<number>(0, Validators.required),
    type: new FormControl(EnumForm, Validators.required),
    installmentAmount: new FormControl<number>(0),
    category: new FormControl(EnumForm, Validators.required),
    proportionality: new FormControl<number>(0),
    shareWith: new FormControl(ProportionalityForm)
  })

  constructor(
    public dialogRef: MatDialogRef<ExpenseDialogComponent>,
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) {
    this.getTypes()
    this.getCategories()
    this.getOthersUsers()
  }

  onSubmitNewStatement() {
    const formValidator = this.expenseForm.value

    const statement: StatementRequest = {
      description: formValidator.description as string,
      category: formValidator.category?.name as string,
      value: this.statementValueNormalize(formValidator.value as number),
      type: formValidator.type?.name as string,
      referenceMonth: localStorage.getItem("currentReferenceMonth") as string
    }

    if (formValidator.installmentAmount != 0) {
      statement.installmentAmount = formValidator.installmentAmount as number
    }

    if (this.isProportionalityExpense) {
      const otherUser = this.expenseForm.get('shareWith')?.getRawValue() as ProportionalityForm
      statement.proportionality = {
        userEmail: otherUser.email,
        percentage: formValidator.proportionality as number
      }
    }

    if (this.isProportionalityExpense) {
      this.createProportionalityExpense(statement)
    }
    else {
      this.createExpense(statement)
    }
  }

  private createExpense(statement: StatementRequest) {
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

  private createProportionalityExpense(statement: StatementRequest) {
    this.http.post(environment.apiUrl.concat(`/statements/proportionality`), statement)
      .subscribe(
        (response) => {
          window.location.reload()
          this.snackBar.open('Despesa compartilhada criada com sucesso', 'Close', {
            duration: 3000
          });
        },
        (error) => {
          this.snackBar.open('Erro ao criar um nova despesa compartilhada', 'Close', {
            duration: 3000,
          });
        }
      );
  }

  changeProportionalityExpense() {
    this.isProportionalityExpense = !this.isProportionalityExpense
    this.handleProportionalityValidators();
  }

  private handleProportionalityValidators() {
    if (this.isProportionalityExpense) {
      this.expenseForm.get('proportionality')?.setValidators(Validators.required)
      this.expenseForm.get('shareWith')?.setValidators(Validators.required)
    } else {
      this.expenseForm.get('proportionality')?.clearValidators()
      this.expenseForm.get('shareWith')?.clearValidators()
    }
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

  private getOthersUsers() {
    this.http.get<UserDetails[]>(environment.apiUrl.concat(`/users/others`))
      .subscribe(
        (response) => {
          this.othersUsers = response
        },
        (error) => {
          this.snackBar.open('Error when trying load other users details', 'Close', {
            duration: 3000,
          });
        }
      );
  }

  private statementValueNormalize(value: number) {
    return value * 100;
  }
}
