import {AccomadationData, AccomadationPageData, BookingData, MovieData, UserData} from "../schemas/datasets";
import S3 from "aws-sdk/clients/s3";
import {S3Client, PutObjectCommand, ObjectCannedACL} from "@aws-sdk/client-s3"; // Import for AWS SDK v3
import { Injectable } from "@angular/core";
import { Observable, from as observableFrom } from "rxjs";
import { HttpClient } from "@angular/common/http";
import {SECRET_KEY, SUPER_SECRET_KEY} from "../../environment"
@Injectable({providedIn: "root"})
export class HttpService {

  private s3: S3Client;

  constructor(private http: HttpClient) {
    const accessKeyId: string = SECRET_KEY || ''; // Provide a fallback value
    const secretAccessKey: string = SUPER_SECRET_KEY || ''; // Provide a fallback value

    this.s3 = new S3Client({
      region: "eu-west-1",
      credentials: {
        accessKeyId,
        secretAccessKey
      }
    });
  }

  uploadFileToS3(file: File): Observable<any> {
    const params = {
      Bucket: 'restapistack-imagesbucketf1a776cf-rf7scykpp1we',
      Key: file.name, // File name you want to save as in S3
      Body: file,
      ContentType: file.type,
      ACL: 'public-read' as ObjectCannedACL // Set your ACL according to your requirements
    };

    const command = new PutObjectCommand(params);
    return observableFrom(this.s3.send(command));
  }

  private apiUrl = 'https://xz3i0ksx8j.execute-api.eu-west-1.amazonaws.com/dev/';


  @Injectable({
    providedIn: 'root',
  })

  // Users API

  addUser(userData: UserData): Observable<any> {
    return this.http.post<UserData>(`${this.apiUrl}/user`, userData);
  }

  addAccomadation(accomadationData: AccomadationData): Observable<any> {
    return this.http.post<AccomadationData>(`${this.apiUrl}/accomadation`, accomadationData);
  }

  addAccomadationPage(accomadationPageData: AccomadationPageData): Observable<any> {
    return this.http.post<AccomadationData>(`${this.apiUrl}/accomadationPage`, accomadationPageData);
  }

  getAllAccomadation(): Observable<any> {
    return this.http.get<AccomadationData[]>(`${this.apiUrl}/accomadation`);
  }

  getAccomadation(id: number): Observable<any> {
    return this.http.get<AccomadationData>(`${this.apiUrl}/accomadation/${id}`);
  }

  getAccomadationPage(id: number): Observable<any> {
    return this.http.get<AccomadationPageData>(`${this.apiUrl}/accomadationPage/${id}`);
  }

  // Booking API

  addBooking(bookingData: BookingData): Observable<any> {
    return this.http.post<UserData>(`${this.apiUrl}/booking`, bookingData);
  }

  getBookingById(userId: string): Observable<BookingData[]> {
    return this.http.get<BookingData[]>(`${this.apiUrl}/booking?userId=${userId}`);
  }


  updateUser(user: UserData): Observable<any> {
    return this.http.put<UserData>(`${this.apiUrl}/user/${user.userId}`, user);

  }

  getUser(user: UserData): Observable<any> {
    return this.http.get<UserData>(`${this.apiUrl}/user/${user.userId}`);

  }
}
