import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private http: HttpClient) {}

  apiUrl: string = environment.apiUrl;

  upload(form: FormData): Observable<any> {
    return this.http.post(this.apiUrl + '/algorithm', form);
  }

  getResult(): Observable<any> {
    return this.http.get(this.apiUrl + '/algorithm');
  }

  getData(idResult: number): Observable<any> {
    return this.http.get(this.apiUrl + '/algorithm/' + idResult);
  }
}
