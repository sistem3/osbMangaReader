import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MangaViewerComponent } from './manga-viewer.component';

describe('MangaViewerComponent', () => {
  let component: MangaViewerComponent;
  let fixture: ComponentFixture<MangaViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MangaViewerComponent ]
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
