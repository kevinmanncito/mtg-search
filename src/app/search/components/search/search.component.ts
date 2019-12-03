import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {debounceTime, takeWhile, tap} from 'rxjs/operators';
import { SearchService } from '../../services/search.service';
import { SharedStateService } from '../../../services/shared-state.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {
  alive = true;

  searchFormControl = new FormControl('');
  searchResults = [];
  loading = false;

  constructor(public searchService: SearchService, public stateService: SharedStateService) { }

  ngOnInit() {
    this.searchFormControl.setValue(this.searchService.searchTerm);
    this.searchFormControl.valueChanges
      .pipe(
        takeWhile(() => this.alive),
        tap(() => {
          this.searchService.clearResults();
          this.loading = true;
        }),
        debounceTime(500)
      )
      .subscribe(searchTerm => {
        this.searchService.search(searchTerm);
      });

    this.searchService.$searchResults
      .subscribe(results => {
        this.searchResults = results;
        this.loading = false;
      });
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
