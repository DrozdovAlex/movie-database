import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritesMoviesComponent } from './favorites-movies.component';

describe('FavoritesMoviesComponent', () => {
  let component: FavoritesMoviesComponent;
  let fixture: ComponentFixture<FavoritesMoviesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavoritesMoviesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoritesMoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
