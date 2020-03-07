import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { LijstrException } from '../exceptions';
import {Observable, throwError} from 'rxjs';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import { catchError } from 'rxjs/operators';

/**
 * A request header injector.
 */
export interface Injector {
  inject(headers: HttpHeaders, authToken: boolean): HttpHeaders;
}

@Injectable()
export class ApiService {

  constructor(http: HttpClient) {
    this.http = http;
    this.domain = environment.endpoint;
    this.endpoint = 'http' + (environment.endpointSSL ? 's' : '') + '://' + environment.endpoint;
    this.injectors = [];
  }

  private readonly domain: string;
  private readonly endpoint: string;
  private http: HttpClient;
  private injectors: Injector[];

  private static handleResponse(response: Response) {
    if (response.text()) {
      return response.json();
    } else {
      return response;
    }
  }

  private static handleError(error: HttpErrorResponse) {
    let exception = null;

    if (error.error instanceof ErrorEvent) {
      console.error('[WTF] Server did not return a LijstrException.. \'' + error.toString() + '\'');
      exception = LijstrException.forMessage(error.toString());
    } else {
      exception = new LijstrException().fromJSON(error.error);
      console.log('[' + exception.status + '] [' + exception.error + '] ' + exception.message);
    }

    return throwError(exception);
  }

  get<T>(path: string, authToken: boolean = true, httpParams?: { [param: string]: string | string[] }): Observable<T> {
    return this.http.get<T>(this.endpoint + path, this.createRequestOptions(authToken, httpParams)).pipe(
      catchError(ApiService.handleError)
    );
  }

  post<T>(path: string, body?: any, authToken: boolean = true): Observable<T> {
    return this.http.post<T>(this.endpoint + path, body, this.createRequestOptions(authToken)).pipe(
      catchError(ApiService.handleError)
    );
  }

  put<T>(path: string, body?: any, authToken: boolean = true): Observable<T> {
    return this.http.put<T>(this.endpoint + path, body, this.createRequestOptions(authToken)).pipe(
      catchError(ApiService.handleError)
    );
  }

  del<T>(path: string, authToken: boolean = true): Observable<T> {
    return this.http.delete<T>(this.endpoint + path, this.createRequestOptions(authToken)).pipe(
      catchError(ApiService.handleError)
    );
  }

  /**
   * Add an interceptor function that can modify the headers.
   * The caller will pass two params:
   *  - headers (dict of current headers)
   *  - authToken (boolean whether an authToken should be injected)
   * @param interceptor the function
   */
  addHeaderInterceptor(interceptor: Injector) {
    this.injectors.push(interceptor);
  }

  /**
   * Create a RequestOptions object.
   * This could be generalized by passing a dictionary of settings instead of just the authToken param.
   * That dictionary could contain {'authToken' : authToken}, this way other possible injectors can also modify
   * the request depending on their individual settings.
   * @param authToken should inject authToken
   * @param params Optional HTTP params
   */
  private createRequestOptions(authToken: boolean, params?: { [param: string]: string | string[] }): {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe?: 'body';
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
  } {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Allow-Control-Allow-Origin': this.domain
    });
    for (const injector of this.injectors) {
      headers = injector.inject(headers, authToken);
    }

    return {
      headers,
      params
    };
  }

}
