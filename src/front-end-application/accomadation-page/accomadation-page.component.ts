import { Component } from '@angular/core';
import {HttpService} from "../service/http.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-accomadation-page',
  templateUrl: './accomadation-page.component.html',
  styleUrls: ['./accomadation-page.component.scss']
})
export class AccomadationPageComponent{
  isLoading: boolean = true;

  accommodation = {
    title: "Sample Accommodation",
    descriptionOne: "Description part one...",
    descriptionTwo: "Description part two...",
    Rooms: {
      single: { pricePerRoom: 100, noAvailable: 5 },
      double: { pricePerRoom: 150, noAvailable: 3 },
      twin: { pricePerRoom: 120, noAvailable: 4 },
      bunkBeds: { pricePerRoom: 90, noAvailable: 6 }
    },
    description: "Extended description...",
    location: "Sample Location",
    facilities: {
      wifi: true,
      privateRoomsAvailable: true,
      food: false,
      lateCheckout: true,
      twentyFourCheckIn: false,
    }
  };


  accId: number = 0;

  constructor(private httpService: HttpService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {

    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam !== null) {
        this.accId = +idParam;
        console.log(this.accId);
        this.httpService.getAccomadationPage(this.accId).subscribe({
          next: (response) => {

            this.accommodation.descriptionOne = response.descriptionOne;
            this.accommodation.descriptionTwo = response.descriptionTwo;
            this.accommodation.Rooms = response.Rooms;
          },
          error: (error) => {
            console.error('Error fetching accommodation data:', error);
          },
          complete: () => {
            this.isLoading = false;
            console.log(this.accommodation);
            console.log('Accommodation data fetch complete.');
          }
        });
      } else {
        console.error('Accommodation ID is not available in the route parameters');
      }
    });
  }

  navigateToCreateAccomadationPage() {
    localStorage.setItem('accId', this.accId.toString());
    localStorage.setItem('accName', this.accommodation.title.toString());
    this.router.navigate(['/bookingPage']);
  }


  // ngOnInit(): void {
  //   this.httpService.getAccomadation().subscribe({
  //     next: (response) => {
  //       this.accommodation = response.data; // Extract the array from the 'data' property
  //     },
  //     error: (error) => {
  //       console.error('Error fetching accommodation data:', error);
  //     },
  //     complete: () => {
  //       this.isLoading = false
  //       console.log(this.accommodation);
  //       console.log('Accommodation data fetch complete.');
  //     }
  //   });
  // }

}
