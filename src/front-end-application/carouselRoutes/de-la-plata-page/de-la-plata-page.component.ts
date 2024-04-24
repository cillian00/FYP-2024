import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-de-la-plata-page',
  templateUrl: './de-la-plata-page.component.html',
  styleUrls: ['./de-la-plata-page.component.scss']
})
export class DeLaPlataPageComponent {

  scrollToElement(element: HTMLElement): void {
    element.scrollIntoView({ behavior: 'smooth' });
  }
  constructor(private router: Router) {}

  navigate() {
    this.router.navigate(['/searchResult']);
  }
  services = [
    {
      name: 'Day 1 - Ourense to Cea. (22km)',
      image: 'https://restapistack-imagesbucketf1a776cf-rf7scykpp1we.s3.eu-west-1.amazonaws.com/Camino-de-la-plata/Snapchat-1851659114.jpg',
      description: ' This route will see you through the town of Ourense known for its impressive roman bridge. The route will then take you down ancient roads and small villages.'
    },
    {
      name: 'Day 2 - Cea to Dozón (16 km)',
      image: 'https://restapistack-imagesbucketf1a776cf-rf7scykpp1we.s3.eu-west-1.amazonaws.com/Camino-de-la-plata/Snapchat-837331775.jpg',
      description: 'This path will take you through lovely forests, between oaks, valleys with various degrees of elevation.'
    },
    {
      name: 'Dozón to Lalín (17 km)',
      image: 'https://restapistack-imagesbucketf1a776cf-rf7scykpp1we.s3.eu-west-1.amazonaws.com/Camino-de-la-plata/via-de-la-plata.png',
      description: 'Through the hills of Gallicia, youll find some of the best views along the path with many areas for exploration'
    },
    {
      name: 'Lalín to Silleda (16 km)',
      image: 'https://restapistack-imagesbucketf1a776cf-rf7scykpp1we.s3.eu-west-1.amazonaws.com/Camino-de-la-plata/Snapchat-103470098.jpg',
      description: 'The path will take you through small forests and villages, medieval bridges'
    },
    {
      name: 'Silleda to Ponte Ulla (20 km)',
      image: 'https://restapistack-imagesbucketf1a776cf-rf7scykpp1we.s3.eu-west-1.amazonaws.com/Camino-de-la-plata/Snapchat-2058270649.jpg',
      description: 'Very similar to the path from Lalin to Silleda but youll walk by a famous village of Bandeira. Well worth the visit for their empanadas'
    },
    {
      name: 'Ponte Ulla to Santiago de Compostela (21 km)',
      image: 'https://restapistack-imagesbucketf1a776cf-rf7scykpp1we.s3.eu-west-1.amazonaws.com/Camino-de-la-plata/Snapchat-1506168383.jpg',
      description: 'The final stretch of the journey will have you ascend past the large bridge and have you walking up the last major part of elevation before you finally arrive in Santiago De Compostella.'
    },

  ];
  highlights = [
    {
      name: 'Beautiful Scenery',
      image: 'https://restapistack-imagesbucketf1a776cf-rf7scykpp1we.s3.eu-west-1.amazonaws.com/Camino-de-la-plata/IMG_0236.JPG',
      description: 'Expect green fields like Ireland and beautiful high altitude views as you ascend and descend amongst the Galician hills.'
    },
    {
      name: 'Excellent small time cafes!',
      image: 'https://restapistack-imagesbucketf1a776cf-rf7scykpp1we.s3.eu-west-1.amazonaws.com/Camino-de-la-plata/IMG_0231.JPG',
      description: 'This path will take you through lovely forests, between oaks, valleys with various degrees of elevation.'
    },
    {
      name: 'Brand new and clean, cheap accommodation',
      image: 'https://restapistack-imagesbucketf1a776cf-rf7scykpp1we.s3.eu-west-1.amazonaws.com/Camino-de-la-plata/albergue1.jpeg',
      description: 'Along this route, new places to stay along the route are popping up all the time in high quality locations!'
    },
    {
      name: 'You will be awarded with a Compostella!',
      image: 'https://restapistack-imagesbucketf1a776cf-rf7scykpp1we.s3.eu-west-1.amazonaws.com/Camino-de-la-plata/camino-santiago-compostela.jpg',
      description: 'Over 100km walking or (200km cycling) will have you awarded with this when you arrive in Santiago De Compostella'
    },
    // Add more services as needed
  ];

}
