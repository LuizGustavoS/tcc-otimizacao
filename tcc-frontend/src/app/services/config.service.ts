import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Info} from "../model/Info";

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor(private http: HttpClient) {}

  apiUrl: string = environment.apiUrl;

  get(): Observable<any> {
    return this.http.get(this.apiUrl + '/config');
  }


  update(info: Info): Observable<any> {
    return this.http.put(this.apiUrl + '/config', info);
  }

}
