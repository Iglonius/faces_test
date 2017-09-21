import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FaceItemComponent } from './face-item.component';

describe('FaceItemComponent', () => {
  let component: FaceItemComponent;
  let fixture: ComponentFixture<FaceItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FaceItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FaceItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
