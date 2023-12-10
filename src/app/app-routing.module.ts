import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { ShowDetailsComponent } from './show-details/show-details.component';

const routes: Routes = [
  {
    path: '',
    component: SearchComponent
  },
  {
    path: 'admin/search',
    component: SearchComponent,
  },
  {
    path: 'film/details',
    component: ShowDetailsComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
