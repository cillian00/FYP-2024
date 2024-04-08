import {AccomadationData} from "../schemas/datasets";
import {HttpClient} from "@angular/common/http";
import {HttpService} from "../service/http.service";
import {Component} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-accomadation',
  templateUrl: './create-accomadation.component.html',
  styleUrls: ['./create-accomadation.component.scss']
})


export class CreateAccomadationComponent {

  public isAlbergue: boolean = false;

  public accomadationData: AccomadationData = {
    accId: 0,
    title: '',
    description: '',
    profilePicture: '',
    location: '',
    facilities:
      {
        wifi: false,
        privateRoomsAvailable: false,
        food: false,
        lateCheckout: false,
        twentyFourCheckIn: false
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

  constructor(private router: Router, private http: HttpClient, private httpService: HttpService) {}

  navigateToCreateAccomadationPage() {
    this.router.navigate(['/create-accomadation-page'], {
      state: { data: this.accomadationData}
    });
    console.log("Moving")
    if (this.selectedProfilePicture) {
      console.log("Attempting to upload Image");
      this.httpService.uploadFileToS3(this.selectedProfilePicture)
        .subscribe(
          response => console.log('Upload successful', response),
          error => console.error('Error during upload', error)
        );
      this.accomadationData.profilePicture = "https://restapistack-imagesbucketf1a776cf-rf7scykpp1we.s3.eu-west-1.amazonaws.com/" + this.selectedProfilePicture.name
    } else {
      console.log("Nothing");
    }

  }

  private resetForm() {
    this.accomadationData = {
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

  public onSubmit() {


    //   if (this.selectedProfilePicture) {
    //     console.log("Uploaded Image");
    //     this.httpService.uploadImageToS3(this.selectedProfilePicture)
    //       .subscribe(
    //         response => console.log('Upload successful', response),
    //         error => console.error('Error during upload', error)
    //       );
    //   } else {
    //     console.log("Nothing");
    //   }
    }

    // this.httpService.addAccomadation(this.accomadationData).subscribe(
    //   (response) => {
    //     console.log('Accomadation added successfully:', response);
    //     this.resetForm();
    //   },
    //   (error) => {
    //     console.error('Error adding Accomadation:', error);
    //   }
    // );

}
