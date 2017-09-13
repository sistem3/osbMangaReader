import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BaseRequestOptions, Http, ConnectionBackend } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { AllTitlesService } from './all-titles.service';
import { MangaDetailsService } from '../manga-details/manga-details.service';
import { UserSettingsService } from '../settings/user-settings.service';
import { MainNavService } from '../main-nav/main-nav.service';

import { AllTitlesComponent } from './all-titles.component';

describe('AllTitlesComponent', () => {
  let component: AllTitlesComponent;
  let fixture: ComponentFixture<AllTitlesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllTitlesComponent ],
      providers: [
        AllTitlesService,
        MangaDetailsService,
        UserSettingsService,
        MainNavService,
        {
          provide: Http, useFactory: (backend: ConnectionBackend, defaultOptions: BaseRequestOptions) => {
          return new Http(backend, defaultOptions);
        }, deps: [MockBackend, BaseRequestOptions]
        },
        { provide: MockBackend, useClass: MockBackend },
        { provide: BaseRequestOptions, useClass: BaseRequestOptions }
      ],
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'all', redirectTo: '/all' },
        ])
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllTitlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
