import { Component, inject, ViewChild } from '@angular/core';
import { Toolbar } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { Table, TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DistrictService } from '../../services/district/district.service';
import { CheckboxModule } from 'primeng/checkbox';
import { TagModule } from 'primeng/tag';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-district',
  imports: [Toolbar, ButtonModule, InputTextModule, ToastModule, TagModule, CheckboxModule, IconField, InputIcon, TableModule, DialogModule, FormsModule, ReactiveFormsModule],
  templateUrl: './district.component.html',
  styleUrl: './district.component.scss',
  providers: [MessageService],
})
export class DistrictComponent {
  private fb = inject(FormBuilder);
  private districtService = inject(DistrictService);
  private messageService = inject(MessageService);

  @ViewChild('dt') dt!: Table;

  districtForm = this.fb.group({
    district_id: [null],
    district_name: [''],
    is_active: [true]
  });

  companies: any[] = [];
  districtId: any = null;
  visible: boolean = false;
  rows: number = 5;
  rowsPerPageOptions: any[] = [5, 10, 20, 25];
  districts: any[] = [];

  constructor() { }

  ngOnInit(): void {
    this.getAllDistricts();
  }
  getAllDistricts() {
    this.districtService.getAllDistricts().subscribe({
      next: (res: any) => {
        console.log(res);
        this.districts = res;
      }, error: (err: any) => {
        console.log(err);
      },
    });
  }
  createDistrict() {
    if (!this.districtForm.value.district_name?.trim()) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please enter a valid district name.' });
      return;
    }
    this.districtForm.value.district_name = this.districtForm.value.district_name?.trim().toUpperCase();
    if (this.districtId) {
      console.log('Update company:', this.districtForm.value);
      this.districtService.updateDistrict(this.districtForm.value).subscribe({
        next: (res: any) => {
          console.log(res);
          Swal.fire({
            title: "Success",
            text: res?.message,
            icon: "success"
          }).then(() => {
            this.visible = false;
            this.districtId = null;
            this.districtForm.reset({
              is_active: true
            });
            this.getAllDistricts();
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
      console.log('Create company:', this.districtForm.value);
      this.districtService.createDistrict(this.districtForm.value).subscribe({
        next: (res: any) => {
          console.log(res);
          Swal.fire({
            title: "Success",
            text: res?.message,
            icon: "success"
          }).then(() => {
            this.visible = false;
            this.districtForm.reset({
              is_active: true
            });
            this.getAllDistricts();
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
  editdistrict(district_id: any) {
    console.log('Edit company:', district_id);
    this.districtService.getDistrictById(district_id).subscribe({
      next: (res: any) => {
        console.log(res);
        this.districtId = district_id;
        this.districtForm.patchValue({
          district_id: res.district_id,
          district_name: res.district_name,
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
  deletedistrict(district_id: any) {
    console.log('Delete district_id:', district_id);
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
        this.districtService.deleteDistrict(district_id).subscribe({
          next: (res: any) => {
            console.log(res);
            Swal.fire({
              title: "Deleted!",
              text: res?.message,
              icon: "success"
            });
            this.getAllDistricts();
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
    this.districtForm.reset({
      is_active: false
    });
    this.visible = false;
    this.districtId = null;
  }
  filterDistricts(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.dt.filterGlobal(value, 'contains');
  }
}
