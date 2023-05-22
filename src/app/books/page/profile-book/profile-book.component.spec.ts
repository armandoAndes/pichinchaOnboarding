import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileBookComponent } from './profile-book.component';

describe('ProfileBookComponent', () => {
  let component: ProfileBookComponent;
  let fixture: ComponentFixture<ProfileBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileBookComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
