import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { CardRoutingModule } from './card-routing.module';
import { CardComponent } from './components/card/card.component';
import { CardService } from './services/card.service';

@NgModule({
  declarations: [CardComponent],
  imports: [
    CommonModule,
    CardRoutingModule,
    HttpClientModule
  ],
  providers: [
    CardService
  ]
})
export class CardModule { }
