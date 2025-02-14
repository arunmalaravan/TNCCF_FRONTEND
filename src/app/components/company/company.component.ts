import { Component, inject } from '@angular/core';
import { Toolbar } from 'primeng/toolbar';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { CommonModule } from '@angular/common';
import { SelectModule } from 'primeng/select';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators, } from '@angular/forms';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { DropdownModule } from 'primeng/dropdown';
import { TagModule } from 'primeng/tag';
import { DialogModule } from 'primeng/dialog';
import { Dialog } from 'primeng/dialog';
import { CheckboxModule } from 'primeng/checkbox';
import { Tooltip, TooltipModule } from 'primeng/tooltip';
import { PopoverModule } from 'primeng/popover';
import { UserService } from '../../services/user/user.service';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import Swal from 'sweetalert2'
import { CompanyService } from '../../services/company/company.service';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-company',
  imports: [CommonModule, ButtonModule, InputTextModule, TableModule, SelectModule, ToastModule, ToolbarModule, InputTextModule, TextareaModule, DropdownModule, InputTextModule, FormsModule, IconFieldModule, InputIconModule, FormsModule, ReactiveFormsModule, TagModule, DialogModule, CheckboxModule, PopoverModule, ConfirmDialogModule,TooltipModule],
  templateUrl: './company.component.html',
  styleUrl: './company.component.scss',
  providers: [MessageService]
})
export class CompanyComponent {
  private fb = inject(FormBuilder);
  private companyService = inject(CompanyService);
  private messageService = inject(MessageService);

  companies: any[] = [];
  companyId: any = null;
  visible: boolean = false;
  rows: number = 5;
  rowsPerPageOptions: any[] = [5, 10, 20, 25];

  companyForm = this.fb.group({
    company_id: [null],
    company_name: ['', [Validators.required]],
    is_active: [true]
  });

  constructor() { }

  ngOnInit(): void {
    this.getAllCompanies();
  }
  getAllCompanies() {
    this.companyService.getAllCompanies().subscribe({
      next: (res: any) => {
        console.log(res);
        this.companies = res;
      }, error: (err: any) => {
        console.log(err);
      },
    });
  }
  createCompany() {
    if (!this.companyForm.value.company_name?.trim()) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please enter a valid company name.' });
      return;
    }
    this.companyForm.value.company_name = this.companyForm.value.company_name?.trim().toUpperCase();
    if (this.companyId) {
      console.log('Update company:', this.companyForm.value);
      this.companyService.updateCompany(this.companyForm.value).subscribe({
        next: (res: any) => {
          console.log(res);
          Swal.fire({
            title: "Success",
            text: res?.message,
            icon: "success"
          }).then(() => {
            this.visible = false;
            this.companyId = null;
            this.companyForm.reset({
              is_active: true
            });
            this.getAllCompanies();
          });
        }, error: (err: any) => {
          console.log(err);
          Swal.fire({
            title: "Error",
            text: err?.error?.message,
            icon: "error"
          });
        },
      });
    } else {
      console.log('Create company:', this.companyForm.value);
      this.companyService.createCompany(this.companyForm.value).subscribe({
        next: (res: any) => {
          console.log(res);
          Swal.fire({
            title: "Success",
            text: res?.message,
            icon: "success"
          }).then(() => {
            this.visible = false;
            this.companyForm.reset({
              is_active: true
            });
            this.getAllCompanies();
          });
        }, error: (err: any) => {
          console.log(err);
          Swal.fire({
            title: "Error",
            text: err?.error?.message,
            icon: "error"
          });
        },
      });
    }
  }
  editCompany(company_id: any) {
    console.log('Edit company:', company_id);
    this.companyService.getCompanyById(company_id).subscribe({
      next: (res: any) => {
        console.log(res);
        this.companyId = company_id;
        this.companyForm.patchValue({
          company_id: res.company_id,
          company_name: res.company_name,
          is_active: res.is_active ? true : false,
        });
        this.visible = true;
      }, error: (err: any) => {
        console.log(err);
        Swal.fire({
          title: "Editing!",
          text: err?.error?.message,
          icon: "error"
        });
      },
    });
  }
  deleteCompany(company_id: any) {
    console.log('Delete company_id:', company_id);
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
        this.companyService.deleteCompany(company_id).subscribe({
          next: (res: any) => {
            console.log(res);
            Swal.fire({
              title: "Deleted!",
              text: res?.message,
              icon: "success"
            });
            this.getAllCompanies();
          }, error: (err: any) => {
            console.log(err);
            Swal.fire({
              title: "Error",
              text: err?.error?.message,
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
    this.companyForm.reset({
      is_active: false
    });
    this.visible = false;
    this.companyId = null;
  }
}
