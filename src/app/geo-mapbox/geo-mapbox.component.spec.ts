import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeoMapboxComponent } from './geo-mapbox.component';

describe('GeoMapboxComponent', () => {
  let component: GeoMapboxComponent;
  let fixture: ComponentFixture<GeoMapboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeoMapboxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeoMapboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
