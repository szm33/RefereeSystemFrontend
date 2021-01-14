import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Store} from '../model/store';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';


const URL = environment.backendURL + 'dictionaries/';

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

    });
  }

  getDictionariesObservable(): Observable<Store> {
    return this.http.get<Store>(URL, httpOptions);
  }
}
