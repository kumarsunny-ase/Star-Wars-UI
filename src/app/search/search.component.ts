import { Component } from '@angular/core';
import { ApiService } from '../Service/api.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  query: string = '';
  resourceType: string = 'people';
  results: any[] = [];
  isSearchComplete = false;

  constructor(private apiService: ApiService) {}

  async search(): Promise<void> {
    if (this.query == '') {
      return;
    }
    if (this.resourceType === 'people') {
      const data = await this.apiService.searchPeople(this.query).toPromise();
      this.results = data.results;

      await this.fetchMovies();
      this.isSearchComplete = true;
      await this.saveHistory();
    } else if (this.resourceType === 'films') {
      const data = await this.apiService.searchFilms(this.query).toPromise();

      this.results = data.results;
      await this.saveHistory();
    }
  }

  // Function to fetch movie titles for each person
  async fetchMovies(): Promise<void> {
    for (const person of this.results) {
      person.movies = [];
      for (const filmUrl of person.films) {
        const data = await this.apiService.getFilmTitle(filmUrl).toPromise();
        person.movies.push({ title: data.title, url: data.url });
        console.log(this.results);    
      }
    }
  }

  saveHistory(): void {
    const results: any[] = [];
    if (this.results[0] && this.results[0].movies) {
      for (const person of this.results) {
        results.push({ name: person.name, movies: person.movies });
      }
    } else {
      console.log(this.results);
      for (const film of this.results) {
        results.push({ title: film.title, director: film.director });
      }
    }

    this.apiService
      .postSearchHistory({
        keyword: this.query,
        result: JSON.stringify(results),
        type: this.resourceType,
      })
      .subscribe();

    console.log(JSON.stringify(results));
  }

  Logout() {
    this.apiService.signOut();
  }
}
