import { Component, inject } from '@angular/core';
import { Toolbar } from 'primeng/toolbar';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
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
import { Tooltip } from 'primeng/tooltip';
import { PopoverModule } from 'primeng/popover';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { SchemeService } from '../../services/scheme/scheme.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-scheme',
  imports: [CommonModule, Toolbar, ButtonModule, InputTextModule, TableModule, SelectModule, ToastModule, ToolbarModule, InputTextModule, TextareaModule, DropdownModule, InputTextModule, FormsModule, IconFieldModule, InputIconModule, FormsModule, ReactiveFormsModule, TagModule, DialogModule, Dialog, CheckboxModule, Tooltip, PopoverModule, ConfirmDialogModule],
  templateUrl: './scheme.component.html',
  styleUrl: './scheme.component.scss',
  providers: [MessageService]
})
export class SchemeComponent {
  private fb = inject(FormBuilder);
  private schemeService = inject(SchemeService);
  private messageService = inject(MessageService);

  schemes: any[] = [];
  schemeId: any = null;
  visible: boolean = false;
  rows: number = 5;
  rowsPerPageOptions: any[] = [5, 10, 20, 25];

  schemeForm = this.fb.group({
    scheme_id: [null],
    scheme_name: ['', [Validators.required]],
    is_active: [true]
  });

  constructor() { }

  ngOnInit(): void {
    this.getAllSchemes();
  }
  getAllSchemes() {
    this.schemeService.getAllSchemes().subscribe({
      next: (res: any) => {
        console.log(res);
        this.schemes = res;
      }, error: (err: any) => {
        console.log(err);
      },
    });
  }
  createScheme() {
    if (!this.schemeForm.value.scheme_name?.trim()) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please enter a valid scheme name.' });
      return;
    }
    this.schemeForm.value.scheme_name = this.schemeForm.value.scheme_name?.trim().toUpperCase();
    if (this.schemeId) {
      console.log('Update scheme:', this.schemeForm.value);
      this.schemeService.updateScheme(this.schemeForm.value).subscribe({
        next: (res: any) => {
          console.log(res);
          Swal.fire({
            title: "Success",
            text: res?.message,
            icon: "success"
          }).then(() => {
            this.visible = false;
            this.schemeId = null;
            this.schemeForm.reset({
              is_active: true
            });
            this.getAllSchemes();
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
      console.log('Create scheme:', this.schemeForm.value);
      this.schemeService.createScheme(this.schemeForm.value).subscribe({
        next: (res: any) => {
          console.log(res);
          Swal.fire({
            title: "Success",
            text: res?.message,
            icon: "success"
          }).then(() => {
            this.visible = false;
            this.schemeForm.reset({
              is_active: true
            });
            this.getAllSchemes();
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
  editScheme(scheme_id: any) {
    console.log('Edit scheme:', scheme_id);
    this.schemeService.getSchemeById(scheme_id).subscribe({
      next: (res: any) => {
        console.log(res);
        this.schemeId = scheme_id;
        this.schemeForm.patchValue({
          scheme_id: res.scheme_id,
          scheme_name: res.scheme_name,
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
  deleteScheme(scheme_id: any) {
    console.log('Delete scheme_id:', scheme_id);
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
        this.schemeService.deleteScheme(scheme_id).subscribe({
          next: (res: any) => {
            console.log(res);
            Swal.fire({
              title: "Deleted!",
              text: res?.message,
              icon: "success"
            });
            this.getAllSchemes();
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
    this.schemeForm.reset({
      is_active: false
    });
    this.visible = false;
    this.schemeId = null;
  }
}
