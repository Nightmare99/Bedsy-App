import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnplottedComponent } from './unplotted.component';

describe('UnpplottedComponent', () => {
  let component: UnplottedComponent;
  let fixture: ComponentFixture<UnplottedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnplottedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnplottedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
