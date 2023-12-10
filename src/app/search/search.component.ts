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

  constructor(private apiService: ApiService) {}

  async search(): Promise<void> {
    if (this.resourceType === 'people') {
      const data = await this.apiService.searchPeople(this.query).toPromise();
      this.results = data.results;

      await this.fetchMovies();
      await this.saveHistory();
      // this.apiService.searchPeople(this.query).subscribe((data) => {
      //   this.results = data.results;
      //   // Fetch corresponding movie titles
      //   this.fetchMovies();
      // });
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
      }
    }
  }

  saveHistory(): void {
    // console.log('first', persons.length);
    const results: any[] = [];
    if (this.results[0].movies) {
      for (const person of this.results) {
        console.log(person.movies.length);

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
}
