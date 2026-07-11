import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimMaster } from './claim-master';

describe('ClaimMaster', () => {
  let component: ClaimMaster;
  let fixture: ComponentFixture<ClaimMaster>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClaimMaster],
    }).compileComponents();

    fixture = TestBed.createComponent(ClaimMaster);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
