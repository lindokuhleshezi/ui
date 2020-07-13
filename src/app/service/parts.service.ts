import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { from } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class PartsService {

  headers = new HttpHeaders()
    .set('Access-Control-Allow-Origin', '*')
    .set('content-type', 'application/json');


  constructor(private http: HttpClient) { }

  getList(): Observable<any> {
    return this.http.get(
      'https://n61jo6k2hb.execute-api.us-east-1.amazonaws.com/dev/parts/list'
    );

  }

  // tslint:disable-next-line: variable-name
  getDetails(part_id: any): Observable<any> {
    const params = new HttpParams().set('part_id', part_id);
    return this.http.get(
      'https://n61jo6k2hb.execute-api.us-east-1.amazonaws.com/dev/parts/sales_data', { params}
    );
  }
}
