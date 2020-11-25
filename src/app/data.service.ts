import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private httpClient: HttpClient) { }

  // tslint:disable-next-line:typedef
  handleError(error: HttpErrorResponse) {
    let errorMesage = 'Unknown Error!';
    if (error.error instanceof ErrorEvent) {
      // Client Side Errors
      errorMesage = `Error: ${error.error.message}`;
    } else {
      // Server Side Errors
      errorMesage = `Error Code: ${error.status}\n Message: ${error.message}`;
    }
    window.alert(errorMesage);
    return throwError(errorMesage);
  }

  public sendGetRequest(){

    let params: any = {};
    const endPoint = 'https://jsonplaceholder.typicode.com/posts';
    return this.httpClient.get(endPoint, { params });
  }


}
