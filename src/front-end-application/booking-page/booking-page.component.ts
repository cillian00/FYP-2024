import { Component } from '@angular/core';
import {BsDatepickerConfig} from 'ngx-bootstrap/datepicker';
import {AuthService} from "../service/auth.service";
import {HttpService} from "../service/http.service";
import {BookingData} from "../schemas/datasets";
import {Router} from "@angular/router";



@Component({
  selector: 'app-booking-page',
  templateUrl: './booking-page.component.html',
  styleUrls: ['./booking-page.component.scss'],
})
export class BookingPageComponent {
  checkInDate: string = ""
  checkOutDate: string = ""
  numberOfGuests: number = 1; // default to 1 guest
  roomType: string = 'Standard'; // default to 'Standard'
  accId: number = 0;
  userId: string = "";
  title: string = "";

   bookingData: BookingData = {
    userId: "",
    bookingId: "",
    accommodationId: 10,
    startDate: '2024-01-01',
    endDate: '2024-01-02',
    guests: '1',
  };

  constructor(private authService: AuthService, private httpService: HttpService) {
  }

  ngOnInit() {

    this.accId = parseInt(localStorage.getItem('accId') || '0');
    console.log('Received accId from storage:', this.accId);

    this.title = (localStorage.getItem('accName') || '0');
    console.log('Received accName from storage:', this.title);
  }

  generateBookingId(accommodationName: string) {
    const timestamp = new Date().getTime();

    const randomString = Math.random().toString(36).substring(2, 15);

    const bookingId = `${accommodationName}-${timestamp}-${randomString}`;

    return bookingId;
  }

  validateDates(startDate: string, endDate: string): boolean {
    const start = new Date(startDate);
    const end = new Date(endDate);
    return start < end;
  }

  async createBooking() {

    // AccommodationId
    this.bookingData.accommodationId = this.accId
    console.log('AccommodationId: ', this.accId);

    if (!this.validateDates(this.checkInDate, this.checkOutDate)) {
      alert('Check-out date must be after check-in date.');
      return;  // Stop execution if dates are invalid
    }

    this.bookingData.bookingId = this.generateBookingId("GrandHotel");
    this.bookingData.startDate = this.checkInDate;
    this.bookingData.endDate = this.checkOutDate;

    // User Id
    await this.authService.currentAuthenticatedUser(); // Ensure user data is loaded
    this.bookingData.userId = this.authService.getId()
    console.log(this.authService.getId()); // Now this will correctly log the user ID, assuming currentAuthenticatedUser() sets it correctly
    console.log('Checking availability for:', this.checkInDate, this.checkOutDate, this.numberOfGuests, this.roomType);

    // Booking Id
    let bookingId: string
    bookingId = this.generateBookingId(this.title)
    this.bookingData.bookingId = bookingId
    console.log("Generated Booking ID:", bookingId);
    this.httpService.addBooking(this.bookingData).subscribe({
      next: (response) => {
        console.log(response)
      },
      error: (error) => {
        console.error('Error adding booking data:', error);
      },
      complete: () => {
        console.log('Accommodation data fetch complete.');
      }
    });

  }

}


