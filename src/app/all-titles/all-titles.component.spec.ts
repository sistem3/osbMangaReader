import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllTitlesComponent } from './all-titles.component';

describe('AllTitlesComponent', () => {
  let component: AllTitlesComponent;
  let fixture: ComponentFixture<AllTitlesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllTitlesComponent ]
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
