import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

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
  public sendGetRequest(){
    // Add safe, URL encoded_page parameter
    const options = { params: new HttpParams({fromString: '_page=1&_limit=20'}) };
    return this.httpClient.get(this.REST_API_SERVER).pipe(retry(3), catchError(this.handleError));
  }
}
