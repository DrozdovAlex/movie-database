import {Component, OnInit} from '@angular/core';
import {MoviePage} from './types';
import {Observable} from 'rxjs';
import {MovieService} from './services/movie.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(private movieService: MovieService) {
  }
  title = 'movie-database';
  private component$ = this.movieService.component$;

  ngOnInit(): void {
    this.movieService.setGenres();
  }

  get moviePage() {
    return MoviePage;
  }


}
