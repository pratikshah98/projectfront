import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepairorderComponent } from './repairorder.component';

describe('RepairorderComponent', () => {
  let component: RepairorderComponent;
  let fixture: ComponentFixture<RepairorderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepairorderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepairorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
