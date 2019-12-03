import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { CardRoutingModule } from './card-routing.module';
import { CardComponent } from './components/card/card.component';
import { CardService } from './services/card.service';

@NgModule({
  declarations: [CardComponent],
  imports: [
    CommonModule,
    CardRoutingModule,
    HttpClientModule,
    MatProgressSpinnerModule
  ],
  providers: [
    CardService
  ]
})
export class CardModule { }
