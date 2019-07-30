import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepairupdateComponent } from './repairupdate.component';

describe('RepairupdateComponent', () => {
  let component: RepairupdateComponent;
  let fixture: ComponentFixture<RepairupdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepairupdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepairupdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
