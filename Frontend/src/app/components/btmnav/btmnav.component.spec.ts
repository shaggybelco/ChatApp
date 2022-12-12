import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtmnavComponent } from './btmnav.component';

describe('BtmnavComponent', () => {
  let component: BtmnavComponent;
  let fixture: ComponentFixture<BtmnavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BtmnavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BtmnavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
