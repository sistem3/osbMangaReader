import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BaseRequestOptions, Http, ConnectionBackend } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { MangaViewerService } from './manga-viewer.service';
import { MainNavService } from '../main-nav/main-nav.service';
import { MangaDetailsService } from '../manga-details/manga-details.service';

import { MangaViewerComponent } from './manga-viewer.component';

describe('MangaViewerComponent', () => {
  let component: MangaViewerComponent;
  let fixture: ComponentFixture<MangaViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MangaViewerComponent ],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        RouterTestingModule.withRoutes([
          { path: 'viewer', redirectTo: '/chapter/akira/1' },
        ])
      ],
      providers: [
        MangaViewerService,
        MainNavService,
        MangaDetailsService,
        {
          provide: Http, useFactory: (backend: ConnectionBackend, defaultOptions: BaseRequestOptions) => {
          return new Http(backend, defaultOptions);
        }, deps: [MockBackend, BaseRequestOptions]
        },
        { provide: MockBackend, useClass: MockBackend },
        { provide: BaseRequestOptions, useClass: BaseRequestOptions }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MangaViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
