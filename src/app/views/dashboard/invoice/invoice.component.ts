import {Component, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {MatAnchor} from "@angular/material/button";
import {MatToolbar} from "@angular/material/toolbar";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatOption, MatSelect} from "@angular/material/select";
import {InvoiceReference, InvoiceResponse} from "../../../common/model/models";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef, MatHeaderRow,
  MatHeaderRowDef, MatRow, MatRowDef,
  MatTable
} from "@angular/material/table";
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {FlexModule} from "@angular/flex-layout";
import {SignoutComponent} from "../../signout/signout.component";
import {YearMonthPipe} from "../../../common/pipe/year-month.pipe";
import {InvoiceStateDictionaryPipe} from "../../../common/pipe/invoice-state-dictionary.pipe";
import {BrlConverterPipe} from "../../../common/pipe/brl-converter.pipe";
import {StatementTypesDictionaryPipe} from "../../../common/pipe/statement-types-dictionary.pipe";
import {StatementCategoriesDictionaryPipe} from "../../../common/pipe/statement-categories-dictionary.pipe";
import {LocalDateTimePipe} from "../../../common/pipe/local-date-time.pipe";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-invoice',
  standalone: true,
  imports: [CommonModule, MatAnchor, MatToolbar, RouterLink, RouterLinkActive, MatFormField, MatSelect, MatOption, MatLabel, MatTable, MatHeaderCellDef, MatHeaderCell, MatCell, MatCellDef, MatColumnDef, MatCardContent, MatCardTitle, MatCardHeader, MatCard, MatHeaderRowDef, MatRow, MatRowDef, MatHeaderRow, FlexModule, SignoutComponent, YearMonthPipe, InvoiceStateDictionaryPipe, BrlConverterPipe, StatementTypesDictionaryPipe, StatementCategoriesDictionaryPipe, LocalDateTimePipe, FormsModule],
  templateUrl: './invoice.component.html',
  styleUrl: './invoice.component.css'
})
export class InvoiceComponent implements OnInit {

  invoicesReferences: InvoiceReference[] | undefined;
  defaultInvoicesReference: InvoiceReference | undefined;
  invoice: InvoiceResponse | undefined;
  displayedColumns: string[] = ['description', 'category', 'value', 'type', 'createdAt'];

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.http.get<InvoiceReference[]>(environment.apiUrl.concat("/invoices/references"))
      .subscribe(
        (response) => {
          this.invoicesReferences = response
          this.defaultInvoicesReference = response.find(reference => reference.state === "CURRENT")
          this.onLoad(this.defaultInvoicesReference?.referenceMonth || "")
        },
        (error) => {
          console.error('Error creating account:', error);
          this.snackBar.open('Error when trying load invoices references', 'Close', {
            duration: 3000,
          });
        }
      );
  }

  onLoad(referenceMonth: string) {
    this.findInvoice(referenceMonth)
  }

  onSelectionChange(event: any) {
    this.findInvoice(event.value.referenceMonth)
  }

  private findInvoice(referenceMonth: string) {
    this.http.get<InvoiceResponse>(environment.apiUrl.concat(`/invoices/${referenceMonth}`))
      .subscribe(
        (response) => {
          this.invoice = response
        },
        (error) => {
          console.error('Error creating account:', error);
          this.snackBar.open('Error when trying load invoices references', 'Close', {
            duration: 3000,
          });
        }
      );
  }
}