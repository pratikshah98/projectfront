import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddrepairComponent } from './addrepair.component';

describe('AddrepairComponent', () => {
  let component: AddrepairComponent;
  let fixture: ComponentFixture<AddrepairComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddrepairComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddrepairComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
