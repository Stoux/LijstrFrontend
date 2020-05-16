import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'lijstr-endpoint-debugger',
  templateUrl: './endpoint-debugger.component.html',
  styleUrls: ['./endpoint-debugger.component.css']
})
export class EndpointDebuggerComponent {

  public path: string;
  public method: string;
  public data: string;

  public response: any;
  public error: any;
  public requesting: boolean;

  constructor(private api: ApiService) {
    this.method = 'GET';
    this.path = '/';
    this.data = '{\n  \n}';
    this.requesting = false;
    this.response = undefined;
    this.error = undefined;
  }

  makeRequest() {
    this.response = undefined;
    this.error = undefined;

    let request: Observable<any>;
    if (this.method === 'GET') {
      request = this.api.get(this.path);
    } else if (this.method === 'POST') {
      request = this.api.post(this.path, JSON.parse(this.data));
    } else if (this.method === 'PUT') {
      request = this.api.put(this.path, JSON.parse(this.data));
    } else if (this.method === 'DELETE') {
      request = this.api.del(this.path);
    } else {
      this.error = 'Invalid method.';
      return;
    }

    this.requesting = true;
    request.toPromise()
      .then(result => this.response = result)
      .catch(error => this.error = error)
      .finally(() => this.requesting = false);
  }

}
