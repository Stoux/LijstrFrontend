import { Injectable } from "@angular/core";
import { Http, Response, RequestOptions, Headers } from "@angular/http";
import { environment } from "../../../environments/environment";
import { LijstrException } from "../exceptions";
import { Observable } from "rxjs";

/**
 * A request header injector.
 */
export interface Injector {
  call(headers : Headers, authToken : boolean) : void;
}

@Injectable()
export class ApiService {

  private readonly domain : string;
  private readonly endpoint : string;
  private http : Http;
  private interceptors : Injector[];

  constructor(http : Http) {
    console.log("Created ApiService");
    this.http = http;
    this.domain = environment.endpoint;
    this.endpoint = 'http' + (environment.endpointSSL ? 's' : '') + '://' + environment.endpoint;
    this.interceptors = [];
  }

  get<T>(path : string, authToken : boolean = true) : Observable<T> {
    return this.http.get(this.endpoint + path, this.createRequestOptions(authToken))
      .map((response) => response.json())
      .catch(ApiService.handleError);
  }

  post<T>(path : string, body : any, authToken : boolean = true) : Observable<T> {
    return this.http.post(this.endpoint + path, body, this.createRequestOptions(authToken))
      .map((response) => response.json())
      .catch(ApiService.handleError);
  }

  put<T>(path : string, body : any, authToken : boolean = true) : Observable<T> {
    return this.http.put(this.endpoint + path, body, this.createRequestOptions(authToken))
      .map((response) => response.json())
      .catch(ApiService.handleError);
  }

  del<T>(path : string, authToken : boolean = true) : Observable<T> {
    return this.http.delete(this.endpoint + path, this.createRequestOptions(authToken))
      .map((response) => response.json())
      .catch(ApiService.handleError);
  }

  /**
   * Add an interceptor function that can modify the headers.
   * The caller will pass two params:
   *  - headers (dict of current headers)
   *  - authToken (boolean whether an authToken should be injected)
   * @param interceptor the function
   */
  addHeaderInterceptor(interceptor : Injector) {
    this.interceptors.push(interceptor);
  }

  /**
   * Create a RequestOptions object.
   * This could be generalized by passing a dictionary of settings instead of just the authToken param.
   * That dictionary could contain {'authToken' : authToken}, this way other possible injectors can also modify
   * the request depending on their individual settings.
   * @param authToken should inject authToken
   */
  private createRequestOptions(authToken : boolean) {
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Allow-Control-Allow-Origin': this.domain
    });
    for (let interceptor of this.interceptors) {
      interceptor.call(headers, authToken);
    }
    return new RequestOptions({headers: headers});
  }

  private static handleError(error : Response | any) {
    let exception = null;
    if (error instanceof Response) {
      exception = <LijstrException> error.json();
      console.log("[" + exception.status + "] [" + exception.error + "] " + exception.message);
    } else {
      console.error("[WTF] Server did not return a LijstrException.. '" + error.toString() + "'");
      exception = new LijstrException(error.toString())
    }
    return Observable.throw(exception);
  }

}
