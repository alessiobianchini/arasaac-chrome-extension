import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ArasaacPictogram } from './arasaac.model';

@Injectable({
  providedIn: 'root'
})
export class ArasaacService {
  private arasaacUrl = "https://api.arasaac.org/api/";
  constructor(
    private http: HttpClient
  ) { }

  public getPictograms(language: string, searchText: string) {
    return this.http.get(`${this.arasaacUrl}pictograms/${language}/bestsearch/${searchText}`)
      .toPromise()
      .then(response => response as Array<ArasaacPictogram>)
  }
}
