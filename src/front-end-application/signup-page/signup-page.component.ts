import { Component } from '@angular/core';
import {AmplifyAuthenticatorModule, AuthenticatorService} from "@aws-amplify/ui-angular";
import {AuthService} from "../service/auth.service";
import {HttpService} from "../service/http.service";
import {UserData} from "../schemas/datasets";


@Component({
  selector: 'app-root',
  templateUrl: 'signup-page.component.html',
  styleUrls: ['signup-page.component.scss']
})
export class SignupPageComponent {
  user: UserData = {
    userId: "",
    userName: "johndoe",
    email: "john.doe@example.com",
    firstName: "John",
    lastName: "Doe",
    bio: "Short bio here...",
    image: null,
    admin: true
  };
  isUserAdmin: boolean = false;




  generateFiveDigitId() {
    return Math.floor(10000 + Math.random() * 90000);
  }

    username: string | null = null;

  constructor(
    public authenticator: AuthenticatorService,
    private authService: AuthService,
    private httpService: HttpService// Injecting AuthService here
  ) {}

  onAuthenticated(username: string) {
    console.log('Authenticated user:', username);
    this.authService.getCurrentUser();
    this.user.userName = this.authService.getUsername();
    this.user.email = this.authService.getEmail();
    this.user.userId = this.authService.getId()
    if (this.isUserAdmin) {
      this.user.admin = true
      console.log("Result of the admin option: " + this.isUserAdmin)
    }
    this.httpService.addUser(this.user).subscribe({
      next: (response) => {
        console.log('User added successfully', response);
      },
      error: (error) => {
        console.error('Error adding user', error);
      }
    });


  }

}
