import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable  } from 'rxjs';
import { map } from 'rxjs/operators';

const apiExpenses = 'http://localhost:3000/ex';
const apiIncome = 'http://localhost:3000/inc';
const apiOverview = 'http://localhost:3000/overview';

const apiExType = 'http://localhost:3000/extype';
const apiIncType = 'http://localhost:3000/inctype';

const apiExAmount = 'http://localhost:3000/ex_amount';
const apiIncAmount = 'http://localhost:3000/inc_amount';
const apiTotalAmount = 'http://localhost:3000/total_amount';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {

  constructor( private _http:HttpClient) { }

  // EXPENSES
  getAllEx(): Observable<any> {
    return this._http.get(`${apiExpenses}`).pipe(
      map((response: any) => {
        // Format the date field to "YYYY-MM-DD" format
        response.data.forEach((item: any) => {
          // Convert the ISO date to a Date object
          const isoDate = new Date(item.exDate);

          isoDate.setDate(isoDate.getDate() + 1);

          // Format the date as "YYYY-MM-DD"
          const formattedDate = isoDate.toISOString().slice(0, 10);

          item.exDate = formattedDate;
        });

        return response;
      })
    );
  }
  getSingleEx(id:any): Observable<any> {
    return this._http.get(`${apiExpenses}/${id}`);
  }
  createEx(extypeID:number, exAmount:number): Observable<any> {
    return this._http.post(`${apiExpenses}`, {
      extypeID, 
      exAmount
    });
  }
  updateEx(extypeID: any, exAmount: any, id: any): Observable<any> {
    return this._http.put(`${apiExpenses}/${id}`, {
      extypeID,
      exAmount
    });
  }
  deleteEx(id: any): Observable<any> {
    return this._http.delete(`${apiExpenses}/${id}`);
  }
  deleteAllEx(): Observable<any> {
    return this._http.delete(`${apiExpenses}`);
  }

  // INCOME
  getAllInc(): Observable<any> {
    return this._http.get(`${apiIncome}`).pipe(
      map((response: any) => {
        // Format the date field to "YYYY-MM-DD" format
        response.data.forEach((item: any) => {
          // Convert the ISO date to a Date object
          const isoDate = new Date(item.incDate);

          isoDate.setDate(isoDate.getDate() + 1);

          // Format the date as "YYYY-MM-DD"
          const formattedDate = isoDate.toISOString().slice(0, 10);

          item.incDate = formattedDate;
        });

        return response;
      })
    );
  }

  getSingleInc(id:any): Observable<any> {
    return this._http.get(`${apiIncome}/${id}`);
  }
  createInc(inctypeID:number, incAmount:number): Observable<any> {
    return this._http.post(`${apiIncome}`, {
      inctypeID,
      incAmount
    })
  }
  updateInc(inctypeID:any, incAmount:any, id: any): Observable<any> {
    return this._http.put(`${apiIncome}/${id}`, {
      inctypeID,
      incAmount
    });
  }
  deleteInc(id: any): Observable<any> {
    return this._http.delete(`${apiIncome}/${id}`);
  }
  deleteAllInc(): Observable<any> {
    return this._http.delete(`${apiIncome}`);
  }
  

  // AMOUNT
  getExAmount(): Observable<any> {
    return this._http.get(`${apiExAmount}`);
  }
  getIncAmount(): Observable<any> {
    return this._http.get(`${apiIncAmount}`);
  }
  getTotalAmount(): Observable<any> {
    return this._http.get(`${apiTotalAmount}`);
  }

  // DATA TYPE
  // ------------------ Expenses type ------------------
  getAllExType(): Observable<any> {
    return this._http.get(`${apiExType}`);
  }
  getSingleExType(id:any): Observable<any> {
    return this._http.get(`${apiExType}/${id}`);
  }
  // ------------------ Income type ------------------
  getAllIncType(): Observable<any> {
    return this._http.get(`${apiIncType}`);
  }
  getSingleIncType(id:any): Observable<any> {
    return this._http.get(`${apiIncType}/${id}`);
  }
}
