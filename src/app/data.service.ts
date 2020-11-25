import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { throwError } from 'rxjs';
import { retry, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private REST_API_SERVER = 'http://localhost:3000/products';

  public first = '';
  public prev = '';
  public next = '';
  public last = '';

  // tslint:disable-next-line:typedef
  parseLinkHeader(header: string) {
    if (header.length == 0) {
      return ;
    }

    let parts = header.split(',');
    var links = {};
    parts.forEach( p => {
      let section = p.split(';');
      var url = section[0].replace(/<(.*)>/, '$1').trim();
      var name = section[1].replace(/rel="(.*)"/, '$1').trim();
      links[name] = url;

    });

    this.first  = links["first"];
    this.last   = links["last"];
    this.prev   = links["prev"];
    this.next   = links["next"];
  }

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

  // tslint:disable-next-line:typedef
  public sendGetRequest(){
    // Add safe, URL encoded _page and _limit parameters

    // tslint:disable-next-line:max-line-length
    return this.httpClient.get(this.REST_API_SERVER, {  params: new HttpParams({fromString: '_page=1&_limit=5'}), observe: 'response'}).pipe(retry(3), catchError(this.handleError), tap(res => {
      console.log(res.headers.get('Link'));
      this.parseLinkHeader(res.headers.get('Link'));
    }));
  }

  public sendGetRequestToUrl(url: string){
    return this.httpClient.get(url, { observe: "response"}).pipe(retry(3), catchError(this.handleError), tap(res => {
      console.log(res.headers.get('Link'));
      this.parseLinkHeader(res.headers.get('Link'));

    }));
  }
}
