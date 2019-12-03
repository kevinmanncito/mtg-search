import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardService } from '../../services/card.service';
import { SharedStateService } from '../../../services/shared-state.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  card: any;

  constructor(private route: ActivatedRoute, private cardService: CardService, private stateService: SharedStateService) { }

  ngOnInit() {
    const { id } = this.route.snapshot.params;
    this.cardService.loadCard(id);
    this.cardService.$card
      .pipe(
        filter(card => !!card)
      )
      .subscribe(card => {
        this.card = card;
      });

    this.cardService.setCard(this.stateService.card$.getValue());
  }
}
