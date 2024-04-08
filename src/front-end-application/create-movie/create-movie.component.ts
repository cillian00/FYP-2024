import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {HttpService} from "../service/http.service";
import {MovieData} from "../schemas/datasets";

@Component({
  selector: 'app-create-movie',
  templateUrl: './create-movie.component.html',
  styleUrls: ['./create-movie.component.scss']
})
export class CreateMovieComponent {
  movieData: MovieData = {
    movieId: 0,
    title: '',
    director: '',
    random: ''
  }

  constructor(private http: HttpClient, private httpService: HttpService) {

  }

  onSubmit() {
    this.httpService.addMovie(this.movieData).subscribe(
      (response) => {
        console.log('Movie added successfully:', response);
        this.resetForm();
      },
      (error) => {
        console.error('Error adding movie:', error);
      }
    );
  }

  resetForm() {
    this.movieData = {
      movieId: 0,
      title: '',
      director: '',
      random: ''
    };
  }

  createNewMovie(movieData: MovieData ) {
    this.httpService.addMovie(movieData).subscribe(
      (response) => {
        console.log('Movie added successfully:', response);
      },
      (error) => {
        console.error('Error adding movie:', error);
      }
    );
  }

}
