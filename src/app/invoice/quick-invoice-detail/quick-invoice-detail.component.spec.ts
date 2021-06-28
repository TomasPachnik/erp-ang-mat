import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickInvoiceDetailComponent } from './quick-invoice-detail.component';

describe('QuickInvoiceDetailComponent', () => {
  let component: QuickInvoiceDetailComponent;
  let fixture: ComponentFixture<QuickInvoiceDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuickInvoiceDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickInvoiceDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
