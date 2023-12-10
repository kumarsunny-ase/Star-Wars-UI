import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../Service/api.service';

@Component({
  selector: 'app-title-details',
  templateUrl: './title-details.component.html',
  styleUrls: ['./title-details.component.css'],
})
export class TitleDetailsComponent implements OnInit {
  filmId: number | null = null;
  filmDetails: any = {};
  tallestPerson: any = {};
  mostExpensiveStarship: any = {};

  constructor(private route: ActivatedRoute, private apiService: ApiService) {}

  ngOnInit(): void {
    
  }
}
