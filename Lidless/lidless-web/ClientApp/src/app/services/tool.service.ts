import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToolService {
  constructor(
    private _httpClient: HttpClient
  ) { }

  public generatePassword(): Observable<string> {
    let options = {
      headers: new HttpHeaders({
      }),
      responseType: 'text' as any
    };
    return this._httpClient.get<string>('https://localhost:44363/api/tool/generate', options);
  }
}
