import { Routes } from '@angular/router';
import { UserComponent } from './components/user/user.component';
import { DistrictComponent } from './components/district/district.component';
import { CompanyComponent } from './components/company/company.component';
import { AmountComponent } from './components/amount/amount.component';
import { CompanyDistrictMappingComponent } from './components/company-district-mapping/company-district-mapping.component';
import { SchemeComponent } from './components/scheme/scheme.component';

export const routes: Routes = [
    { path: 'scheme', component: SchemeComponent },
    { path: 'user', component: UserComponent },
    { path: 'district', component: DistrictComponent },
    { path: 'company', component: CompanyComponent },
    { path: 'amount', component: AmountComponent },
    { path: 'company-district-mapping', component: CompanyDistrictMappingComponent },
    { path: '', redirectTo: '/scheme', pathMatch: 'full' }
];
