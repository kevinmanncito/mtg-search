import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SearchService } from '../../services/search.service';
import { debounceTime } from 'rxjs/operators';
import { SharedStateService } from '../../../services/shared-state.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  searchFormControl = new FormControl('');
  searchResults = [];

  constructor(public searchService: SearchService, public stateService: SharedStateService) { }

  ngOnInit() {
    this.searchFormControl.valueChanges
      .pipe(
        debounceTime(500)
      )
      .subscribe(searchTerm => {
        this.searchService.search(searchTerm);
      });

    this.searchService.$searchResults
      .subscribe(results => {
        this.searchResults = results;
      });
  }

}
