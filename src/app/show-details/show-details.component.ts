import { Component, OnInit } from '@angular/core';
import { ApiService } from '../Service/api.service';
import { fetchExpensiveStarwarsResponses } from '../Models/fetch-starwars-model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-show-details',
  templateUrl: './show-details.component.html',
  styleUrls: ['./show-details.component.css'],
})
export class ShowDetailsComponent implements OnInit {
  expensiveStarWars: string = '';
  tallestPerson: string = '';

  constructor(private apiService: ApiService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const movieDetailsApiUrl = this.route.snapshot.queryParamMap.get('url');

    if (movieDetailsApiUrl) {
      this.apiService
        .fetchExpensiveData(movieDetailsApiUrl)
        .subscribe((data) => {
          this.expensiveStarWars = data.starshipName;
          this.tallestPerson = data.personName;
        });
    }
  }
}
