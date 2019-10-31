import { Component } from '@angular/core';
import { interval } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  title = 'test';

  started = false;
  currentTime = new Date(0);
  subscription;

  waitClicks = 0;

  constructor() { }

  startStop() {
    this.started = !this.started;

    if (!this.subscription) {
      this.initSubscription();
    }
  }

  reset() {
    this.started = false;
    this.currentTime = new Date(0);
  }

  initSubscription() {
    this.subscription = interval(1000).subscribe(val => {
      if (!this.started) return;

      this.currentTime = new Date(this.currentTime.getTime());
      this.currentTime.setSeconds(this.currentTime.getSeconds() + 1);
    });
  }

  wait() {
    this.waitClicks++;
    if (this.waitClicks >= 2) {
      this.started = false;
      this.waitClicks = 0;
    }

    setTimeout(() => {
      this.waitClicks = 0;
    }, 300);
  }
}
