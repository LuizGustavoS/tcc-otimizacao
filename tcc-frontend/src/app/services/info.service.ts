import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Info} from "../model/Info";

@Injectable({
  providedIn: 'root'
})
export class InfoService {

  constructor(private http: HttpClient) {}

  apiUrl: string = environment.apiUrl;

  get(tipo: number): Observable<any> {
    return this.http.get(this.apiUrl + '/info/tipo/' + tipo);
  }

  create(info: Info): Observable<any> {
    return this.http.post(this.apiUrl + '/info', info);
  }

  update(info: Info): Observable<any> {
    return this.http.put(this.apiUrl + '/info', info);
  }

  delete(info: Info): Observable<any> {
    return this.http.delete(this.apiUrl + '/info/' + info.id);
  }
}
