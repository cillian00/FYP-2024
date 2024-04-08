import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SearchResultComponent} from "./search-result/search-result.component";
import {HomeComponent} from "./home-component/home.component";
import {SignupPageComponent} from "./signup-page/signup-page.component";
import {CreateMovieComponent} from "./create-movie/create-movie.component";
import {CreateAccomadationComponent} from "./create-accomadation/create-accomadation.component";
import {CreateAccomadationPageComponent} from "./create-accomadation-page/create-accomadation-page.component";
import {AccomadationPageComponent} from "./accomadation-page/accomadation-page.component";

const routes: Routes = [
  { path: 'searchResult', component: SearchResultComponent },
  { path: 'searchResult/:id', component: AccomadationPageComponent },
  { path: 'signUp', component: SignupPageComponent },
  { path: '', component: HomeComponent },
  { path: 'createMovie', component: CreateMovieComponent },
  { path: 'createAccomadation', component: CreateAccomadationComponent },
  { path: 'create-accomadation-page', component: CreateAccomadationPageComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
