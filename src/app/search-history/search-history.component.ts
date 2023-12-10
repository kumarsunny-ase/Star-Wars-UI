import { Component, Input } from '@angular/core';
import { searchHistory } from '../Models/search-history';
import { ApiService } from '../Service/api.service';

@Component({
  selector: 'app-search-history',
  templateUrl: './search-history.component.html',
  styleUrls: ['./search-history.component.css'],
})
export class SearchHistoryComponent {
  @Input() resourceType : string;
  searchHistories: searchHistory[] = [];
  histories: any = [];

  constructor(private apiService: ApiService) {
    this.resourceType = '';
  }

  ngOnInit(): void {
    this.apiService.fetchSearchHistory().subscribe((response) => {
      // console.log(results);
      // console.log(
      //   response.history.map((result: any) => ({
      //     keyword: result.keyword,
      //     results: JSON.parse(result.result),
      //   }))
      // );
      this.histories = response.history.map((history: any) => ({
        keyword: history.keyword,
        results: JSON.parse(history.result),
        type: history.type,
      }));
    });
  }
}
