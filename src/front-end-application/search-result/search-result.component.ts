  import {Component, OnInit} from '@angular/core';
  import {Router} from "@angular/router";
  import {HttpService} from "../service/http.service";
  import {AccomadationData, AccomadationPageData} from "../schemas/datasets";
  import {Observable} from "rxjs";

  @Component({
    selector: 'app-search-result',
    templateUrl: './search-result.component.html',
    styleUrls: ['./search-result.component.scss']
  })

  export class SearchResultComponent implements OnInit {
    accomadationData: Array<AccomadationData> = [];
    accommodation?: AccomadationPageData;
    isLoading: boolean = true;
    currentPage: number = 1;
    itemsPerPage: number = 4;
    locationFilter: string = '';
    checkInDateFilter: Date | null = null;
    checkOutDateFilter: Date | null = null;
    guestsFilter: number = 0;
    lowestPrice: number = 0;


    constructor(private router: Router, private httpService: HttpService) {

    }

    // Filtering ---

    applyFilters() {

      this.accomadationData = this.getFilteredAccommodations()
      if (this.locationFilter = "") {

        this.httpService.getAllAccomadation().subscribe({
          next: (response) => {
            this.accomadationData = response.data; // Extract the array from the 'data' property
          },
          error: (error) => {
            console.error('Error fetching accommodation data:', error);
          },
          complete: () => {
            this.isLoading = false
            console.log(this.accomadationData);
            console.log('Accommodation data fetch complete.');
          }
        });

      }
    }

    getFilteredAccommodations() {
      return this.accomadationData.filter(accommodation =>
        accommodation.location == this.locationFilter
      );
    }


    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    }

    nextPage() {
      if (this.currentPage < this.getLastPage()) {
        this.currentPage++;
      }
    }

    navigateToCreateAccomadationPage() {
      this.router.navigate(['/create-accomadation-page'], {
        state: {data: this.accomadationData}
      });
    }

    async getLowestPrice(accid: number): Promise<number> {
      try {


          // Filter out undefined prices and then get the minimum
          console.log(this.lowestPrice);
          return this.lowestPrice; // Return the lowest price


        return 0;
      }
      catch
        (error)
        {
          console.error('Error fetching accommodation data:', error);
          return 0; // Return 0 or throw an error as appropriate
        }
      }



    getLastPage() {
      return Math.ceil(this.accomadationData.length / this.itemsPerPage);
    }

    ngOnInit(): void {
      this.httpService.getAllAccomadation().subscribe({
        next: (response) => {
          this.accomadationData = response.data; // Extract the array from the 'data' property
        },
        error: (error) => {
          console.error('Error fetching accommodation data:', error);
        },
        complete: () => {
          this.isLoading = false
          console.log(this.accomadationData);
          console.log('Accommodation data fetch complete.');
        }
      });
    }

  }
