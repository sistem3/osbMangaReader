import { Component, OnInit } from '@angular/core';
import { NightTimeService } from './night-time/night-time.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [ NightTimeService ]
})
export class AppComponent implements OnInit {
  title = 'OSB Manga Reader';

  constructor(private nightTime: NightTimeService) {}

  ngOnInit() {
    this.nightTime.checkNight();
  }
}
