import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  public $card = new BehaviorSubject(null);

  constructor(private http: HttpClient) { }

  loadCard(id: string) {
    this.http.get(`https://api.magicthegathering.io/v1/cards/${id}`)
      .subscribe((results: any) => {
        const { card = null } = results;
        this.$card.next(card);
      });
  }

  setCard(cardData: any) {
    this.$card.next(cardData);
  }
}
