import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MovieSearchComponent } from './movie-search/movie-search.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule, MatGridListModule, MatIconModule, MatInputModule, MatListModule, MatPaginatorModule} from '@angular/material';
import { MovieInfoComponent } from './movie-info/movie-info.component';
import {MovieService} from './services/movie.service';
import { FavoritesMoviesComponent } from './favorites-movies/favorites-movies.component';

@NgModule({
  declarations: [
    AppComponent,
    MovieSearchComponent,
    MovieListComponent,
    MovieInfoComponent,
    FavoritesMoviesComponent
  ],
    imports: [
        BrowserModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatInputModule,
        MatGridListModule,
        MatListModule,
        MatButtonModule,
        MatPaginatorModule,
        MatIconModule
    ],
  providers: [
    MovieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
