import { Component, OnInit } from '@angular/core';
import {MovieService} from '../services/movie.service';

@Component({
  selector: 'app-favorites-movies',
  templateUrl: './favorites-movies.component.html',
  styleUrls: ['./favorites-movies.component.css']
})
export class FavoritesMoviesComponent implements OnInit {

  constructor(private movieService: MovieService) { }

  ngOnInit() {
  }

  get favoritesMovies() {
    return this.movieService.favorites;
  }

  get link() {
    return this.movieService.link;
  }

  toMovieInfo(movie) {
    this.movieService.toMovieInfo(movie);
  }

  backToMovieList() {
    this.movieService.backToMovieList();
  }

  deleteFormFavorites(movieDetails: any) {
    this.movieService.deleteFromFavorites(movieDetails);
  }
}
