import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { MovieService } from '../services/movie.service';
import {Genres} from '../shared/genres-response.model';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
  constructor(private httpClient: HttpClient, private movieService: MovieService) { }

  private movieList: any;

  ngOnInit() {
    this.movieService.getPopularMovies(this.pageIndex).subscribe(data => this.movieList = data);
  }

  toFavoritesMovies() {
    this.movieService.toFavoritesMovies();
  }

  movieSelect(movie: any) {
    this.movieService.toMovieInfo(movie);
  }

  get pageIndex() {
    return this.movieService.pageIndex;
  }

  get link() {
    return this.movieService.link;
  }

  previousPage() {
    this.movieService.previousPage();
    this.movieService.getPopularMovies(this.pageIndex).subscribe(data => this.movieList = data);
  }

  nextPage() {
    this.movieService.nextPage();
    this.movieService.getPopularMovies(this.pageIndex).subscribe(data => this.movieList = data);
  }
}
