// magic-background.component.ts
import { Component, AfterViewInit, Renderer2, ElementRef } from '@angular/core';

declare var tsParticles: any;

@Component({
  selector: 'app-magic-background',
  template: '<div id="tsparticles"></div>',
  styleUrls: ['./magic-background.component.scss']
})
export class MagicBackgroundComponent implements AfterViewInit {

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngAfterViewInit(): void {
    this.loadScript();
  }

  loadScript() {
    const script = this.renderer.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://cdn.jsdelivr.net/npm/tsparticles-slim@2.0.6/tsparticles.slim.bundle.min.js';
    script.onload = () => this.loadParticles();

    this.renderer.appendChild(this.el.nativeElement, script);
  }
  loadParticles() {
    const options = {
      background: {
        color: "#000",
      },
      particles: {
        links: {
          enable: false,
        },
        move: {
          enable: true,
          speed: 3,
          direction: "right",
          outModes: {
            right: "out",
          },
        },
        color: {
          value: "#500080",
        },
        opacity: {
          value: { min: 0.5, max: 1 },
        },
        size: {
          value: { min: 2, max: 4 },
        },
        number: {
          density: {
            enable: true,
            area: 200, // Increase or decrease the area to control the density of stars
          },
          value: 50, // Adjust this value to control the total number of stars
        },
        shape: {
          type: "star", // Set the particle shape to star
        },
      },
    };

    tsParticles.load('tsparticles', options);
  }



}
