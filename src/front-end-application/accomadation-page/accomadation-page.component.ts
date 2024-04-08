import { Component } from '@angular/core';
import {HttpService} from "../service/http.service";
import {ActivatedRoute} from "@angular/router";

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

  constructor(private httpService: HttpService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam !== null) {
        this.accId = +idParam; // Convert to number
        console.log(this.accId);
        this.httpService.getAccomadation(this.accId).subscribe({
              next: (response) => {
                this.accommodation = response.data; // Extract the array from the 'data' property
              },
              error: (error) => {
                console.error('Error fetching accommodation data:', error);
              },
              complete: () => {
                this.isLoading = false
                console.log(this.accommodation);
                console.log('Accommodation data fetch complete.');
              }
            });
        // Now use this.accId to fetch accommodation details or for other logic
      } else {
        // Handle the case where idParam is null
        console.error('Accommodation ID is not available in the route parameters');
      }
    });
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
