import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeLibrayComponent } from './home-libray.component';

describe('HomeLibrayComponent', () => {
  let component: HomeLibrayComponent;
  let fixture: ComponentFixture<HomeLibrayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeLibrayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeLibrayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
