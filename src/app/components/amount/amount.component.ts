import { ChangeDetectorRef, Component, inject, LOCALE_ID } from '@angular/core';
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
import { AmountService } from '../../services/amount/amount.service';
import { SchemeService } from '../../services/scheme/scheme.service';
import { DistrictService } from '../../services/district/district.service';
import { InputNumberModule } from 'primeng/inputnumber';
import XLSX from 'xlsx';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-amount',
  imports: [CommonModule, ButtonModule, InputTextModule, TableModule, SelectModule, ToastModule, ToolbarModule, InputTextModule, TextareaModule, DropdownModule, InputTextModule, FormsModule, IconFieldModule, InputIconModule, FormsModule, ReactiveFormsModule, TagModule, DialogModule, CheckboxModule, PopoverModule, ConfirmDialogModule, InputNumberModule,TooltipModule],
  templateUrl: './amount.component.html',
  styleUrl: './amount.component.scss',
  providers: [{ provide: LOCALE_ID, useValue: 'en-IN' }, MessageService],
})
export class AmountComponent {
  private fb = inject(FormBuilder);
  private amountService = inject(AmountService);
  private schemeService = inject(SchemeService);
  private companyService = inject(CompanyService);
  private messageService = inject(MessageService);

  expandedRows = {};
  amounts: any[] = [];
  amountId: any = null;
  visible: boolean = false;
  rows: number = 5;
  rowsPerPageOptions: any[] = [5, 10, 20, 25];
  schemes: any[] = [];
  districts: any[] = [];
  companies: any[] = [];

  amountForm = this.fb.group({
    amount_id: [null],
    scheme_id: [null, [Validators.required]],
    district_id: [null, [Validators.required]],
    company_id: [null, [Validators.required]],
    amount: [null, [Validators.required]]
  });

  constructor() { }

  ngOnInit(): void {
    this.getAllAmounts();
    this.getSchemes();
    this.getFilteredCompanyDistricts();
  }
  getAllAmounts() {
    this.amountService.getAllAmounts().subscribe({
      next: (res: any) => {
        console.log(res);
        this.amounts = res;
      }, error: (err: any) => {
        console.log(err);
      },
    });
  }
  getSchemes() {
    this.schemeService.getAllSchemes().subscribe({
      next: (res: any) => {
        console.log(res);
        this.schemes = res;
      }, error: (err: any) => {
        console.log(err);
      },
    });
  }
  getFilteredCompanyDistricts() {
    const params = {
      company_id: this.amountForm.get('company_id')?.value,
      district_id: this.amountForm.get('district_id')?.value
    };
    console.log(params);
    this.companyService.getFilteredCompanyDistricts(params).subscribe({
      next: (res: any) => {
        console.log(res);
        this.companies = res.companies;
        this.districts = res.districts;
      }, error: (err: any) => {
        console.log(err);
      },
    });
  }
  // Handle company change
  onCompanyChange() {
    this.getFilteredCompanyDistricts(); // Fetch updated company-district data
  }
  // Handle district change
  onDistrictChange() {
    this.getFilteredCompanyDistricts(); // Fetch updated company-district data
  }
  createAmount() {
    if (!this.amountForm.value.scheme_id) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please select a scheme.' });
      return;
    }
    if (!this.amountForm.value.company_id) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please select a company.' });
      return;
    }
    if (!this.amountForm.value.district_id) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please select a district.' });
      return;
    }
    if (!this.amountForm.value.amount) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please enter a valid amount.' });
      return;
    }
    if (this.amountId) {
      this.amountService.updateAmount(this.amountForm.value).subscribe({
        next: (res: any) => {
          console.log(res);
          Swal.fire({
            title: "Success",
            text: res?.message,
            icon: "success"
          }).then(() => {
            this.visible = false;
            this.amountId = null;
            this.amountForm.reset();
            this.getAllAmounts();
            this.getFilteredCompanyDistricts();
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
      this.amountService.createAmount(this.amountForm.value).subscribe({
        next: (res: any) => {
          console.log(res);
          Swal.fire({
            title: "Success",
            text: res?.message,
            icon: "success"
          }).then(() => {
            this.visible = false;
            this.amountForm.reset();
            this.getAllAmounts();
            this.getFilteredCompanyDistricts();
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
  editAmount(amount_id: any) {
    this.amountService.getAmountById(amount_id).subscribe({
      next: (res: any) => {
        this.amountId = amount_id;
        this.amountForm.patchValue({
          amount_id: res.amount_id,
          scheme_id: res.scheme_id,
          district_id: res.district_id,
          company_id: res.company_id,
          amount: res.amount
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
  deleteAmount(amount_id: any) {
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
        this.amountService.deleteAmount(amount_id).subscribe({
          next: (res: any) => {
            Swal.fire({
              title: "Deleted!",
              text: res?.message,
              icon: "success"
            });
            this.getAllAmounts();
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
    this.amountForm.reset();
    this.visible = false;
    this.amountId = null;
  }
  export(data: any) {
    const headers = ["Company Name", "District Name", "Amount",];
    const rows = data.details.map((item: any) => [
      item.company_name,
      item.district_name,
      item.amount,
    ]);
    const aoa = [headers, ...rows];
    const wb = XLSX.utils.book_new();

    const ws = XLSX.utils.aoa_to_sheet([[`Scheme: ${data.scheme_name}`], ...aoa]);

    ws["!merges"] = [
      { s: { r: 0, c: 0 }, e: { r: 0, c: 2 } }
    ];

    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    const schemeName = data.scheme_name;
    const filename = `${schemeName}_ExportedData.xlsx`;
    XLSX.writeFile(wb, filename);
  }
}
