import { TestBed } from '@angular/core/testing';

import { CompanyDistrictMappingService } from './company-district-mapping.service';

describe('CompanyDistrictMappingService', () => {
  let service: CompanyDistrictMappingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompanyDistrictMappingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
