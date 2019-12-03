import { Component } from '@angular/core';
import { SharedStateService } from './services/shared-state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public stateService: SharedStateService) {}
}
