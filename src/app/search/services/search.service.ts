import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, BehaviorSubject } from 'rxjs';

@Injectable()
export class SearchService {

  public $searchResults = new BehaviorSubject<any[]>([]);

  constructor(private http: HttpClient) { }

  search(searchTerm: string) {
    if (!searchTerm || searchTerm === '') {
      this.$searchResults.next([]);
      return;
    }
    this.http.get(`https://api.magicthegathering.io/v1/cards?name=${searchTerm}`).subscribe((results: any) => {
      const { cards = [] } = results;
      this.$searchResults.next(cards);
    });
  }
}
