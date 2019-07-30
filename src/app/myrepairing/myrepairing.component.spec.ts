import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyrepairingComponent } from './myrepairing.component';

describe('MyrepairingComponent', () => {
  let component: MyrepairingComponent;
  let fixture: ComponentFixture<MyrepairingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyrepairingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyrepairingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
