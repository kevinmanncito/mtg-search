import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedStateService {

  card$ = new BehaviorSubject(null);

  constructor() { }

  setCard(card: any) {
    this.card$.next(card);
  }
}
