import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyDistrictMappingComponent } from './company-district-mapping.component';

describe('CompanyDistrictMappingComponent', () => {
  let component: CompanyDistrictMappingComponent;
  let fixture: ComponentFixture<CompanyDistrictMappingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanyDistrictMappingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyDistrictMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
