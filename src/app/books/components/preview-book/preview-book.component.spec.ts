import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewBookComponent } from './preview-book.component';

describe('PreviewBookComponent', () => {
  let component: PreviewBookComponent;
  let fixture: ComponentFixture<PreviewBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviewBookComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
