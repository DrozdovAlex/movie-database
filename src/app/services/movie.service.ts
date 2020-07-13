import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, map, retry} from 'rxjs/operators';
import {BehaviorSubject} from 'rxjs';
import {MoviePage} from '../types';
import {MovieDetails, MovieResponse} from '../shared/movie-response.model';
import {Genres, GenresResponse} from '../shared/genres-response.model';

@Injectable()
export class MovieService {

  private readonly imageLink = 'https://image.tmdb.org/t/p/original';
  private readonly movieApiKey = 'a0defe87c557dd8f1fbd1741ce8abcf0';
  private readonly apiUrl = `https://api.themoviedb.org/3`;
  private page = 1;
  private movieGenres: Genres[];
  private componentSubject$ = new BehaviorSubject<MoviePage>(MoviePage.MOVIELIST);
  private selectedMovieSubject$ = new BehaviorSubject<MovieDetails>(null);
  private similarMoviesSubject$ = new BehaviorSubject<any>(null);
  private selectedMovieGenresSubject$ = new BehaviorSubject<Genres[]>(null);
  component$ = this.componentSubject$.asObservable();
  selectedMovie$ = this.selectedMovieSubject$.asObservable();
  similarMovies$ = this.similarMoviesSubject$.asObservable();

  constructor(private http: HttpClient) {}

  nextPage() {
    if (this.page < 40000) {
    this.page++;
  }
  }

  previousPage() {
    if (this.page > 1) {
    this.page--;
    }
  }

  get pageIndex() {
    return this.page;
  }

  get link() {
    return this.imageLink;
  }

  get favorites() {
    return JSON.parse(localStorage.getItem('favorites') || '[]');
  }

  isFavorite(movie: MovieDetails) {
    const movies = JSON.parse(localStorage.getItem('favorites') || '[]');
    return movies.filter(data => data.id === movie.id).length > 0;
  }

  addToFavorites(movie: MovieDetails) {
    if (!this.isFavorite(movie)) {
      const movies = JSON.parse(localStorage.getItem('favorites') || '[]');
      movies.push(movie);
      localStorage.setItem('favorites', JSON.stringify(movies));
    }
  }

  deleteFromFavorites(movie: MovieDetails) {
    let movies = JSON.parse(localStorage.getItem('favorites') || '[]');
    movies = movies.filter(data => data.id !== movie.id);
    localStorage.setItem('favorites', JSON.stringify(movies));
  }

  toMovieInfo(movie: MovieDetails) {
    this.componentSubject$.next(MoviePage.MOVIEINFO);
    this.selectedMovieSubject$.next(movie);
    this.getSimilarMovies(movie.id).subscribe(data => this.similarMoviesSubject$.next(data));
  }

  backToMovieList() {
    this.componentSubject$.next(MoviePage.MOVIELIST);
  }

  toFavoritesMovies() {
    this.componentSubject$.next(MoviePage.FAVORITESMOVIES);
  }

  getPopularMovies(page: number) {
    const popularUrl = `/movie/popular?api_key=${this.movieApiKey}`;
    const url = `${this.apiUrl + popularUrl}`;

    return this.http.get(`${url}&page=${page}`)
          .pipe(
            map((res: MovieResponse) => res.results),
            retry(3),
            catchError(this.handleError)
    );
  }

  getSimilarMovies(id: number) {
    const similarUrl = `/movie/${id}/similar?api_key=${this.movieApiKey}`;
    const url = `${this.apiUrl + similarUrl}`;

    return this.http.get(`${url}`)
      .pipe(
        map((res: MovieResponse) => res.results),
        retry(3),
        catchError(this.handleError)
      );
  }

  searchMovie(query: string) {
    const searchUrl = `/search/movie?api_key=${this.movieApiKey}&query=${query}`;
    const url = `${this.apiUrl + searchUrl}`;

    return this.http.get(`${url}`)
      .pipe(
        map((res: MovieResponse) => res.results),
        retry(3),
        catchError(this.handleError)
      );
  }

  get genres(): Genres[] {
    return this.movieGenres;
  }

  setGenres() {
    this.getGenres().subscribe((data: Genres[]) => this.movieGenres = data);
  }

  getGenres() {
    const genresUrl = `/genre/movie/list?api_key=${this.movieApiKey}`;
    const url = `${this.apiUrl + genresUrl}`;

    return this.http.get(`${url}`)
      .pipe(
        map((res: GenresResponse) => res.genres),
        retry(3),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return (
      'Something bad happened; please try again later.');
  }
}
