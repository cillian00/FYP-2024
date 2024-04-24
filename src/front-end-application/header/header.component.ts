import {Component, Input, OnInit} from '@angular/core';
import {AuthenticatorService} from "@aws-amplify/ui-angular";
import {AuthService} from "../service/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})


export class HeaderComponent implements OnInit {
  @Input() username: string | null = null;


  constructor(
    public authenticator: AuthenticatorService,
    private authService: AuthService // Injecting AuthService here
  ) {
    console.log(this.username)

  }

  ngOnInit() {
    this.loadUserDetails();
  }

  async loadUserDetails() {
    await this.authService.currentAuthenticatedUser();
    this.username = this.authService.getUsername(); // Update username after fetching
    console.log(this.username);
  }




}
