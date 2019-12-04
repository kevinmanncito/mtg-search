import {Component, OnDestroy, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {debounce, filter, takeWhile} from 'rxjs/operators';

import { CardService } from '../../services/card.service';
import { SharedStateService } from '../../../services/shared-state.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit, OnDestroy {
  alive = true;
  card: any;

  constructor(private route: ActivatedRoute, private cardService: CardService, private stateService: SharedStateService) { }

  ngOnInit() {
    const { id } = this.route.snapshot.params;
    this.cardService.$card
      .pipe(
        takeWhile(() => this.alive),
        filter(card => !!card),
        filter(card => {
          try {
            return card.multiverseid === parseInt(id, 10);
          } catch (e) {
            return false;
          }
        })
      )
      .subscribe(card => {
        this.card = card;
      });

    const serviceCard = this.stateService.card$.getValue();
    this.cardService.$card.next(serviceCard);
    this.cardService.loadCard(id);
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
