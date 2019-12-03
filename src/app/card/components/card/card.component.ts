import {Component, OnDestroy, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, takeWhile } from 'rxjs/operators';

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
        filter(card => !!card)
      )
      .subscribe(card => {
        this.card = card;
      });

    this.card = this.stateService.card$.getValue();
    if (!this.card || !this.card.imageUrl) {
      this.cardService.loadCard(id);
    }
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
