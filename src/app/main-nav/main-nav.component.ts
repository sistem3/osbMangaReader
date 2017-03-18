import { Component, OnInit } from '@angular/core';
import { NightTimeService } from '../night-time/night-time.service';
import { ViewerSettingsService } from '../settings/viewer-settings.service';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  providers: [ NightTimeService, ViewerSettingsService ]
})
export class MainNavComponent implements OnInit {

  hideMenu:boolean = false;

  constructor(private nightTime: NightTimeService,
              private viewerSettings: ViewerSettingsService) { }

  ngOnInit() {
  }

  setNightTime() {
    this.nightTime.setNight();
  }

}
