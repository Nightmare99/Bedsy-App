import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnplottedItemComponent } from './unplotted-item.component';

describe('UnplottedItemComponent', () => {
  let component: UnplottedItemComponent;
  let fixture: ComponentFixture<UnplottedItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnplottedItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnplottedItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
