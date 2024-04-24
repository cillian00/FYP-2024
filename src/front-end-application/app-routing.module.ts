import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SearchResultComponent} from "./search-result/search-result.component";
import {HomeComponent} from "./home-component/home.component";
import {CreateAccomadationComponent} from "./create-accomadation/create-accomadation.component";
import {CreateAccomadationPageComponent} from "./create-accomadation-page/create-accomadation-page.component";
import {AccomadationPageComponent} from "./accomadation-page/accomadation-page.component";
import {DeLaPlataPageComponent} from "./carouselRoutes/de-la-plata-page/de-la-plata-page.component";
import {SignupPageComponent} from "./signup-page/signup-page.component";
import {UserProfileComponent} from "./user-profile/user-profile.component";
import {BookingPageComponent} from "./booking-page/booking-page.component";

const routes: Routes = [
  { path: 'searchResult', component: SearchResultComponent },
  { path: 'searchResult/:id', component: AccomadationPageComponent },
  { path: 'signUp', component: SignupPageComponent },
  { path: '', component: HomeComponent },
  { path: 'createAccomadation', component: CreateAccomadationComponent },
  { path: 'create-accomadation-page', component: CreateAccomadationPageComponent },
  { path: 'de-la-plata-page', component: DeLaPlataPageComponent },
  { path: 'myProfile', component: UserProfileComponent },
  { path: 'bookingPage', component: BookingPageComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
