// src/app/auth.service.ts
import { Injectable } from '@angular/core';
import {getCurrentUser} from "@aws-amplify/auth";
import {CognitoAuthSignInDetails} from "@aws-amplify/auth/dist/esm/providers/cognito/types";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private username: string = 'none'
  private signInDetails: CognitoAuthSignInDetails | undefined;
  private userId: string = '';

async currentAuthenticatedUser() {
      const {username, userId, signInDetails} = await getCurrentUser();
      this.username = username;
      this.userId = userId
      this.signInDetails = signInDetails
      console.log(`The username: ${username}`);
      console.log(`The userId: ${userId}`);
      console.log(`SignInDetails: ${signInDetails}`)
    }


  getUsername(): string{
    return this.username
  }

  async getCurrentUser() {
    try {
      const user = await getCurrentUser();
      console.log(user);
      return user;
    } catch (error) {
      console.error('Error fetching user', error);
      return null;
    }
  }

  async getUserAttributes() {
    const user = await this.getCurrentUser();
    if (user) {

      return user;
    }
    return null;
  }

  getId(): string {

  return this.userId
  }
  getEmail() {
    return "";
  }
}
