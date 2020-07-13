import { Component, OnInit } from '@angular/core';
import {MovieService} from '../services/movie.service';

@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.css']
})
export class MovieSearchComponent implements OnInit {

  constructor(private movieService: MovieService) { }
  private searchList: any;

  ngOnInit() {
  }

  searchMovie(query: any) {
    this.movieService.searchMovie(query.target.value).subscribe(data => this.searchList = data);
  }

  closeList() {
    this.searchList = [];
  }

  movieSelect(movie: any) {
    this.searchList = [];
    this.movieService.toMovieInfo(movie);
  }

  get link() {
    return this.movieService.link;
  }

}
