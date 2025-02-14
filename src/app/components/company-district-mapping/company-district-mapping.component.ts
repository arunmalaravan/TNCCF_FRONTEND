import { Component, inject } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { CommonModule } from '@angular/common';
import { SelectModule } from 'primeng/select';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators, } from '@angular/forms';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { DropdownModule } from 'primeng/dropdown';
import { TagModule } from 'primeng/tag';
import { DialogModule } from 'primeng/dialog';
import { CheckboxModule } from 'primeng/checkbox';
import { TooltipModule } from 'primeng/tooltip';
import { PopoverModule } from 'primeng/popover';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CompanyService } from '../../services/company/company.service';
import { DistrictService } from '../../services/district/district.service';
import { InputNumberModule } from 'primeng/inputnumber';
import { CompanyDistrictMappingService } from '../../services/company_district_mapping/company-district-mapping.service';
import { MultiSelectModule } from 'primeng/multiselect';
import { MessageService } from 'primeng/api';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-company-district-mapping',
  imports: [CommonModule, ButtonModule, InputTextModule, TableModule, SelectModule, ToastModule, ToolbarModule, InputTextModule, TextareaModule, DropdownModule, InputTextModule, FormsModule, IconFieldModule, InputIconModule, FormsModule, ReactiveFormsModule, TagModule, DialogModule, CheckboxModule, PopoverModule, ConfirmDialogModule, InputNumberModule, MultiSelectModule, TooltipModule],
  templateUrl: './company-district-mapping.component.html',
  styleUrl: './company-district-mapping.component.scss',
  providers: [MessageService]
})
export class CompanyDistrictMappingComponent {
  private fb = inject(FormBuilder);
  private companyDistrictMappingService = inject(CompanyDistrictMappingService);
  private companyService = inject(CompanyService);
  private districtService = inject(DistrictService);
  private messageService = inject(MessageService);

  mappings: any[] = [];
  visible: boolean = false;
  rows: number = 5;
  rowsPerPageOptions: any[] = [5, 10, 20, 25];
  companies: any[] = [];
  districts: any[] = [];

  expandedRows = {};

  mappingForm: FormGroup = this.fb.group({
    company_id: [null, [Validators.required]],
    district_id: [[], [Validators.required]]
  });

  ngOnInit(): void {
    this.getAllMappings();
    this.getCompanies();
    this.getDistricts();
  }
  getAllMappings() {
    this.companyDistrictMappingService.getAllCompanyDistrictMappings().subscribe({
      next: (res: any) => {
        console.log(res);
        this.mappings = res;
      },
      error: (err: any) => {
        console.error(err);
      }
    });
  }
  getCompanies() {
    this.companyService.getAllCompanies().subscribe({
      next: (res: any) => {
        this.companies = res;
      },
      error: (err: any) => {
        console.error(err);
      }
    });
  }
  getDistricts() {
    this.districtService.getAllDistricts().subscribe({
      next: (res: any) => {
        this.districts = res;
      },
      error: (err: any) => {
        console.error(err);
      }
    });
  }
  createMapping() {
    if (!this.mappingForm.value.company_id) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please select a company.' });
      return;
    }
    if (!this.mappingForm.value.district_id || this.mappingForm.value.district_id.length === 0) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please select at least one district.' });
      return;
    }
    this.companyDistrictMappingService.createCompanyDistrictMapping(this.mappingForm.value).subscribe({
      next: (res: any) => {
        Swal.fire({
          title: "Success",
          text: res.message,
          icon: "success"
        }).then(() => {
          this.visible = false;
          this.mappingForm.reset();
          this.getAllMappings();
        });
      },
      error: (err: any) => {
        Swal.fire({
          title: "Error",
          text: err.error.message,
          icon: "error"
        });
      }
    });
  }
  deleteCompanyDistrictMapping(companyId: number, districtId: number) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        const params = {
          company_id: companyId,
          district_id: districtId
        };
        this.companyDistrictMappingService.deleteCompanyDistrictMapping(params).subscribe({
          next: (res: any) => {
            Swal.fire({
              title: "Deleted!",
              text: res.message,
              icon: "success"
            });
            this.getAllMappings();
          },
          error: (err: any) => {
            Swal.fire({
              title: "Error",
              text: err.error.message,
              icon: "error"
            });
          }
        });
      }
    });
  }
  showDialog() {
    this.visible = true;
  }
  cancel() {
    this.mappingForm.reset();
    this.visible = false;
  }
}
