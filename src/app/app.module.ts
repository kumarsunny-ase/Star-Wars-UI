import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { SearchComponent } from './search/search.component';
import { FormsModule } from '@angular/forms';
import { ShowDetailsComponent } from './show-details/show-details.component';
import { SearchHistoryComponent } from './search-history/search-history.component';

@NgModule({
  declarations: [AppComponent, SearchComponent, ShowDetailsComponent, SearchHistoryComponent, SearchHistoryComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
