import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Store} from '../model/store';
import {Observable} from 'rxjs';


const URL = 'https://localhost:8443/dictionaries/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class DictionaryService {

  store: Store = new Store();

  constructor(private http: HttpClient) { }

  getDictionaries() {
    this.http.get<Store>(URL, httpOptions).subscribe(data => {this.store = data;
    console.log(data);
    console.log(this.store);
    });
  }

  getDictionariesObservable(): Observable<Store> {
    return this.http.get<Store>(URL, httpOptions);
  }
}
