import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import {CarouselComponent} from "./carouselRoutes/carouselPortugese/carousel.component";
import {CommonModule} from "@angular/common";
import {CarouselFrenchComponent} from "./carouselRoutes/carouselFrench/carouselFrench.component";
import { CarouselDeLaPlataComponent } from './carouselRoutes/carousel-de-la-plata/carousel-de-la-plata.component';
import { RouterModule, Routes } from '@angular/router';
import { SearchResultComponent } from './search-result/search-result.component';
import { HomeComponent } from './home-component/home.component';
import { MagicBackgroundComponent } from './magic-background/magic-background.component';
import { FooterMainComponent } from './footer-main/footer-main.component';
import { SignupPageComponent } from './signup-page/signup-page.component';
import { CreateMovieComponent } from './create-movie/create-movie.component';
import {HttpClientModule} from "@angular/common/http";
import { CreateAccomadationComponent } from './create-accomadation/create-accomadation.component';
import { LevelSystemBarComponent } from './level-system-bar/level-system-bar.component';
import { ModernCardComponent } from './modern-card/modern-card.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import { AccomadationPageComponent } from './accomadation-page/accomadation-page.component';
import { CreateAccomadationPageComponent } from './create-accomadation-page/create-accomadation-page.component';
import { DeLaPlataPageComponent } from './carouselRoutes/de-la-plata-page/de-la-plata-page.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CarouselComponent,
    CarouselFrenchComponent,
    CarouselDeLaPlataComponent,
    SearchResultComponent,
    HomeComponent,
    MagicBackgroundComponent,
    FooterMainComponent,
    SignupPageComponent,
    CreateMovieComponent,
    CreateAccomadationComponent,
    LevelSystemBarComponent,
    ModernCardComponent,
    AccomadationPageComponent,
    CreateAccomadationPageComponent,
    DeLaPlataPageComponent,

  ],
    imports: [
        HttpClientModule,
        FormsModule,
        BrowserModule,
        AppRoutingModule,
        CommonModule,
        BrowserAnimationsModule,
        MatProgressSpinnerModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
