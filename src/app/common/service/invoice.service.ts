import { Injectable } from '@angular/core';
import {InvoiceReference, InvoiceResponse} from "../model/models";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor(private http: HttpClient) { }

  getInvoicesReferences(): Observable<InvoiceReference[]> {
    return this.http.get<InvoiceReference[]>(environment.apiUrl.concat("/invoices/references"))
  }

  getInvoiceDetails(referenceMonth: string): Observable<InvoiceResponse> {
    return this.http.get<InvoiceResponse>(environment.apiUrl.concat(`/invoices/${referenceMonth}`))
  }
}
