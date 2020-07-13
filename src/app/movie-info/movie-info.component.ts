import { Component, OnInit } from '@angular/core';
import {MovieService} from '../services/movie.service';
import {MovieDetails} from '../shared/movie-response.model';
import {Genres} from '../shared/genres-response.model';

@Component({
  selector: 'app-movie-info',
  templateUrl: './movie-info.component.html',
  styleUrls: ['./movie-info.component.css']
})
export class MovieInfoComponent implements OnInit {

  constructor(private movieService: MovieService) { }
  private movieDetails: MovieDetails;
  private similarMovieList: any;


  ngOnInit() {
    this.movieService.selectedMovie$.subscribe(data => this.movieDetails = data);
    this.movieService.similarMovies$.subscribe(data => this.similarMovieList = data);
  }

  movieSelect(movie: any) {
    this.movieService.toMovieInfo(movie);
  }

  backToMovieList() {
    this.movieService.backToMovieList();
  }

  get link() {
    return this.movieService.link;
  }

  get movie(): MovieDetails {
    return this.movieDetails;
  }

  get genres(): Genres[] {
    return this.movieService.genres;
  }

  addToFavorites(movie: MovieDetails) {
    this.movieService.addToFavorites(movie);
  }

  isFavorite(movie) {
    return this.movieService.isFavorite(movie);
  }

  toFavoritesMovies() {
    this.movieService.toFavoritesMovies();
  }

  deleteFormFavorites(movieDetails: any) {
    this.movieService.deleteFromFavorites(movieDetails);
  }
}
