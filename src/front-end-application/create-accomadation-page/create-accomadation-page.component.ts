import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {AccomadationData, AccomadationPageData} from "../schemas/datasets";
import {HttpService} from "../service/http.service";

@Component({
  selector: 'app-create-accomadation-page',
  templateUrl: './create-accomadation-page.component.html',
  styleUrls: ['./create-accomadation-page.component.scss']
})
export class CreateAccomadationPageComponent {
  isLoading: boolean = true;

  public accommodationData: AccomadationData;

  public accommodation: AccomadationPageData = {
    accId: 0,
    title: "",
    descriptionOne: "",
    descriptionTwo: "",
    Rooms: {
      single: {
        pricePerRoom: 0,
        noAvailable: 0,
      },
      double: {
        pricePerRoom: 0,
        noAvailable: 0,
      },
      twin: {
        pricePerRoom: 0,
        noAvailable: 0,
      },
      bunkBeds: {
        pricePerRoom: 0,
        noAvailable: 0,
      }
    }
  };

  public selectedProfilePicture: File | null = null;
  public profilePicturePreviewUrl: string | ArrayBuffer | null = null;


  public onProfilePictureChange(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList) {
      this.selectedProfilePicture = fileList[0];

      const reader = new FileReader();

      reader.onload = (e: ProgressEvent<FileReader>) => {
        this.profilePicturePreviewUrl = e.target!.result;
      };

      reader.readAsDataURL(this.selectedProfilePicture);
    }
  }

  constructor(private router: Router, private httpService: HttpService) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state && 'data' in navigation.extras.state) {
      this.accommodationData = navigation.extras.state['data'];
    } else {
      this.accommodationData = {
        accId: 0,
        title: '',
        description: '',
        location: '',
        profilePicture: '',
        facilities:
          {
            wifi: false,
            privateRoomsAvailable: false,
            food: false,
            lateCheckout: false,
            twentyFourCheckIn: false
          }
      };
    }
  }

  private resetForm() {
    this.accommodationData = {
      accId: 0,
      title: '',
      description: '',
      location: '',
      profilePicture: '',
      facilities: {
        wifi: false,
        twentyFourCheckIn: false,
        privateRoomsAvailable: false,
        food: false,
        lateCheckout: false
      }
    };
  }

  public submitAccommodation() {
    // First, submit the accommodation data
    this.httpService.addAccomadation(this.accommodationData).subscribe(
      (response) => {
        console.log('Accomadation added successfully:', response);

        // After successfully adding the accommodation data, set the accId for accommodation page
        this.accommodation.accId = this.accommodationData.accId;

        // Then, submit the accommodation page data
        this.httpService.addAccomadationPage(this.accommodation).subscribe(
          (response) => {
            console.log('Accomadation page added successfully:', response);
            this.resetForm();
          },
          (error) => {
            console.error('Error adding Accomadation page:', error);
          }
        );
      },
      (error) => {
        console.error('Error adding Accomadation:', error);
      }
    );

    console.log('Accommodation Data:', this.accommodation);
  }


}
