import { Component, Input, SimpleChange } from '@angular/core';
import { searchHistory } from '../Models/search-history';
import { ApiService } from '../Service/api.service';

@Component({
  selector: 'app-search-history',
  templateUrl: './search-history.component.html',
  styleUrls: ['./search-history.component.css'],
})
export class SearchHistoryComponent {
  @Input() resourceType: string;
  searchHistories: searchHistory[] = [];
  histories: any = [];

  constructor(private apiService: ApiService) {
    this.resourceType = '';
  }

  ngOnInit(): void {
    this.fetchSearchHistory();
  }

  ngOnChanges(changes: SimpleChange) {
    for (let propName in changes) {
      if (propName === 'resourceType') {
        this.fetchSearchHistory();
      }
    }
  }

  fetchSearchHistory() {
    this.apiService
      .fetchSearchHistory(this.resourceType)
      .subscribe((response) => {
        this.histories = response.history.map((history: any) => ({
          keyword: history.keyword,
          results: JSON.parse(history.result),
          type: history.type,
        }));
      });
  }
}
