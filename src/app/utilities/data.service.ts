import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { Observable, observable, ObservableInput, of } from 'rxjs';
import { IClient } from '../model/i-client';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private baseUrl = 'http://localhost:1147';

  constructor(private http: HttpClient) {

  }

  public getData(serviceMethod: string) {
    const finalUrl = this.baseUrl + serviceMethod;
    return this.http.get(finalUrl).pipe(
      retry(3),
      catchError(
       (error: any, caught: Observable<HttpEvent<any>>) => {
         if (error.status === 200) {
           this.handleError(error);
           return of(error);
         }
         throw error;
       }
   ),
    );

  }

  public postData(serviceMethod: string, json: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })};
   const finalUrl = this.baseUrl  + serviceMethod;
   return this.http.post(finalUrl, json, httpOptions)
   .pipe(
     retry(3),
     catchError(
      (error: any, caught: Observable<HttpEvent<any>>) => {
        if (error.status === 200) {
          this.handleError(error);
          return of(error);
        }
        throw error;
      }
  ),
   );
  }

  handleError(err){
    console.log(err.ok);
  }
}
