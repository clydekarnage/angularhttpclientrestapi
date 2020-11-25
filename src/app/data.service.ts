import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { relative } from 'path';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private REST_API_SERVER = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) { }

  // tslint:disable-next-line:typedef
  handleError(error: HttpErrorResponse) {
    let errorMesage = 'Unknown Error!';
    if (error.error instanceof ErrorEvent) {
      // Client Side Errors
      errorMesage =`Error: ${error.error.message}`;
    } else {
      // Server Side Errors
      errorMesage = `Error Code: ${error.status}\n Message: ${error.message}`;
    }
    window.alert(errorMesage);
    return throwError(errorMesage);
  }

  // tslint:disable-next-line:typedef
  public setGetRequest(){
    return this.httpClient.get(this.REST_API_SERVER);
  }
}
