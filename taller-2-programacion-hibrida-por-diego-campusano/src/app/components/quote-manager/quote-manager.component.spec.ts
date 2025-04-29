import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { QuoteManagerComponent } from './quote-manager.component';

describe('QuoteManagerComponent', () => {
  let component: QuoteManagerComponent;
  let fixture: ComponentFixture<QuoteManagerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [QuoteManagerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(QuoteManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
