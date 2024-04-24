import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import {BookingData, UserData} from "../schemas/datasets";
import { HttpService } from "../service/http.service";

interface User {
  firstName: string;
  lastName: string;
  email: string;
  bio: string;
  image: string | null;
}

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  bookingsDropdown = false;
  photosDropdown = false;
  bookings: BookingData[] = [];
  editMode = false;
   user: UserData = {
     userId: "d255a4d4-d0f1-7089-faa8-968a8064eca6",
     admin: true,
     bio: "bbb...",
     content: "john hated this film",
     email: null,
     firstName: "John",
     image: null,
     lastName: "Doe",
     userName: "d255a4d4-d0f1-7089-faa8-968a8064eca6" // Assuming this is correct; otherwise, provide the actual username
   }
   ;

  constructor(private httpService: HttpService) {}

  ngOnInit() {
    this.httpService.getUser(this.user).subscribe({
      next: (response) => {
        console.log('User retrieved successfully', response);
        // Update user object with the response
        this.user = {...this.user, ...response};
      },
      error: (error) => {
        console.error('Error retrieving user', error);
      }
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.user.image = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  toggleEdit(): void {
    this.editMode = !this.editMode;
  }

  saveChanges(): void {
    console.log('Saving changes:', this.user);
    this.toggleEdit(); // You might want to move this after successful update
    this.httpService.updateUser(this.user).subscribe({
      next: (response) => {
        console.log('User updated successfully', response);
        // Optionally, toggle edit mode here to ensure it only toggles on successful update
      },
      error: (error) => {
        console.error('Error updating user', error);
      }
    });
  }


  toggleBookingsDropdown(): void {
    this.bookingsDropdown = !this.bookingsDropdown;
    if (this.bookingsDropdown && this.bookings.length === 0) {
      this.loadBookings();
      console.log("Loading")
    }
  }

  togglePhotosDropdown(): void {
    this.photosDropdown = !this.photosDropdown;
    if (this.bookingsDropdown && this.bookings.length === 0) {
      this.loadBookings();
      console.log("Loading")
    }
  }

  loadBookings(): void {
    console.log("Attempting to load bookings")
    const userId = 'd255a4d4-d0f1-7089-faa8-968a8064eca6'; // Example userId
    this.httpService.getBookingById(userId).subscribe({
      next: (data) => {
        // Log when data is successfully retrieved
        console.log("Bookings loaded successfully:", data);
        this.bookings = data;
      },
      error: (error) => {
        // Log detailed error information if the request fails
        console.error('Failed to load bookings', error);
      },
      complete: () => {
        // Optionally, you can log when the Observable completes
        console.log("Booking retrieval attempt complete.");
      }
    });
  }
}
