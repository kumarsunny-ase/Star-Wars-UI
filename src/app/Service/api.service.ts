import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'https://swapi.dev/api';
  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  searchPeople(query: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/people?search=${query}`);
  }

  searchFilms(query: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/films?search=${query}`);
  }

  getMovies(urls: string[]): Observable<any[]> {
    const movieRequests = urls.map((url) => this.http.get(url));
    return forkJoin(movieRequests);
  }

  getFilmTitle(url: string): Observable<any> {
    return this.http.get(url);
  }

  // getDirectorName(url: string): Observable<any> {
  //   console.log(url);
  //   return this.http.get(url);
  // }

  // getPerson(url: string): Observable<any> {
  //   return this.http.get<any>(url);
  // }

  fetchExpensiveData(movieUrl: string): Observable<any> {
    const backendUrl = 'https://localhost:7118/api/films';
    const payload = { url: movieUrl };
    return this.http.post<any>(backendUrl, payload);
  }

  fetchSearchHistory(resourceType: string): Observable<any> {
    const backendUrl = 'https://localhost:7118/search/history';
    return this.http.get<any>(`${backendUrl}?resourceType=${resourceType}`);
  }

  postSearchHistory(payload: {
    keyword: string;
    result: string;
    type: string;
  }): Observable<any> {
    console.log(payload);
    const backendUrl = 'https://localhost:7118/search/history';
    return this.http.post<any>(backendUrl, payload);
  }

  login(userObj: any) {
    const backendUrl = 'https://localhost:7118/Authenticate';
    return this.http.post<any>(`${backendUrl}`, userObj);
  }
  signUp(userObj: any) {
    const backendUrl = 'https://localhost:7118/register';
    return this.http.post<any>(`${backendUrl}`, userObj);
  }

   storeToken(tokenValue: string){
    localStorage.setItem('token', tokenValue);
   }

   getToken(){
    return localStorage.getItem('token');
   }

   isLoggedIn(): boolean{
    return !localStorage.getItem('token')
   }
}
