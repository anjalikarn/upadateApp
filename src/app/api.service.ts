import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Cases } from './cases';
import { Statistic } from './statistic';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = 'http://35.200.231.216/motestsFiles/rmsServices/api.php';
//const apiUrl = 'http://localhost/aj-services/api.php';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /*getCases(): Observable<Cases[]> {
    return this.http.get<Cases[]>(`${apiUrl}`)
      .pipe(
        tap(cases => console.log('fetched cases')),
        catchError(this.handleError('getCases', []))
      );
  }*/

  getCases(){
    let caseList = {
      "sdata":{
        "action_type":"get_case"
      }
    }
    return this.http.post<any>(apiUrl,JSON.stringify(caseList));
  }

  /*getCasesById(id: string): Observable<Cases> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Cases>(url).pipe(
      tap(_ => console.log(`fetched cases id=${id}`)),
      catchError(this.handleError<Cases>(`getCasesById id=${id}`))
    );
  }*/

  getCasesById(id: string){
    let catData = {
      "sdata":{
        "action_type":"get_case_id",
        "id" : id
      }
    }
    return this.http.post<any>(apiUrl, JSON.stringify(catData));
  }




  /*addCases(cases: Cases): Observable<Cases> {
    return this.http.post<Cases>(apiUrl, cases, httpOptions).pipe(
      tap((c: Cases) => console.log(`added product w/ id=${c._id}`)),
      catchError(this.handleError<Cases>('addCases'))
    );
  }*/


  addCases(catD){
    let catData = {
      "sdata":catD
    }
    return this.http.post<any>(apiUrl, JSON.stringify(catData));
  }

  updateCases(caseD){
    let catData = {
      "sdata":caseD,
    }
    return this.http.post<any>(apiUrl, JSON.stringify(catData));
  }

  deleteCases(id: string){
    let catData = {
      "sdata":{
        "action_type":"delete_case",
        "id" : id
      }
    }
    return this.http.post<any>(apiUrl, JSON.stringify(catData));
  }

  

  getStatistic(status): Observable<any>{
    debugger;
    let catData = {
      "sdata":{
          "action_type":"get_stats",
          "status":status
      },
    }
   // alert(JSON.stringify(catData))
    return this.http.post<any>(apiUrl, JSON.stringify(catData));
  }

  /*updateCases(id: string, cases: Cases): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.put(url, cases, httpOptions).pipe(
      tap(_ => console.log(`updated cases id=${id}`)),
      catchError(this.handleError<any>('updateCases'))
    );
  }*/

  /*deleteCases(id: string): Observable<Cases> {
    const url = `${apiUrl}/${id}`;
    return this.http.delete<Cases>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted cases id=${id}`)),
      catchError(this.handleError<Cases>('deleteCases'))
    );
  }*/

 /*getStatistic(status: string): Observable<Statistic> {
    const url = `${apiUrl}/daily/${status}`;
    return this.http.get<Statistic>(url).pipe(
      tap(_ => console.log(`fetched statistic status=${status}`)),
      catchError(this.handleError<Statistic>(`getStatistic status=${status}`))
    );
  }*/
}
