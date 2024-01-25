import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env';

@Injectable({
  providedIn: 'root',
})
export class HttpHelperService {
  constructor(private HttpClient: HttpClient) {}

  baseUrl: any = environment.base_url;

  get(url) {
    return this.HttpClient.get(`${this.baseUrl}${url}`);
  }

  delete(url) {
    return this.HttpClient.get(`${this.baseUrl}${url}`);
  }
}
