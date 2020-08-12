import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EkgComponent } from './ekg.component';

describe('EkgComponent', () => {
  let component: EkgComponent;
  let fixture: ComponentFixture<EkgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EkgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EkgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
