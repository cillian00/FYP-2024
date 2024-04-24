import { Component } from '@angular/core';
import {AmplifyAuthenticatorModule, AuthenticatorService} from '@aws-amplify/ui-angular';
import {Amplify} from "aws-amplify";
import awsExports from 'src/aws-exports'

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent {
  title = 'my-angular-app';

}

export class UseAuthenticatorComponent {
  constructor(public authenticator: AuthenticatorService) {
    Amplify.configure(awsExports);
  }
}
