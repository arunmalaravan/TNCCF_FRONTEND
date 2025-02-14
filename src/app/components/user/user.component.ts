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
import { Tooltip } from 'primeng/tooltip';
import { PopoverModule } from 'primeng/popover';
import { UserService } from '../../services/user/user.service';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user',
  imports: [CommonModule, Toolbar, ButtonModule, InputTextModule, TableModule, SelectModule, ToastModule, ToolbarModule, InputTextModule, TextareaModule, DropdownModule, InputTextModule, FormsModule, IconFieldModule, InputIconModule, FormsModule, ReactiveFormsModule, TagModule, DialogModule, Dialog, CheckboxModule, Tooltip, PopoverModule, ConfirmDialogModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {
  private fb = inject(FormBuilder);
  private userService = inject(UserService);

  users: any[] = [];
  userId: any = null;
  visible: boolean = false;
  rows: number = 5;
  rowsPerPageOptions: any[] = [5, 10, 20, 25];

  userForm = this.fb.group({
    user_id: [null],
    first_name: [null],
    last_name: [null],
    email: ['', [Validators.required, Validators.email]],
    phone_number: [''],
    password: [''],
    confirm_password: [''],
    is_active: [true]
  });

  constructor() { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe({
      next: (res: any) => {
        console.log(res);
        this.users = res;
      }, error: (err: any) => {
        console.log(err);
      },
    });
  }
  createUser() {
    if (this.userId) {
      console.log('Update user:', this.userForm.value);
      this.userService.updateUser(this.userForm.value).subscribe({
        next: (res: any) => {
          console.log(res);
          Swal.fire({
            title: "Success",
            text: res?.message,
            icon: "success"
          }).then(() => {
            this.visible = false;
            this.userForm.reset({
              is_active: true
            });
            this.getAllUsers();
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
      console.log('Create user:', this.userForm.value);
      this.userService.createUser(this.userForm.value).subscribe({
        next: (res: any) => {
          console.log(res);
          Swal.fire({
            title: "Success",
            text: res?.message,
            icon: "success"
          }).then(() => {
            this.visible = false;
            this.userForm.reset({
              is_active: true
            });
            this.getAllUsers();
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
  editUser(user_id: any) {
    console.log('Edit user:', user_id);
    this.userService.getUserById(user_id).subscribe({
      next: (res: any) => {
        console.log(res);
        this.userId = user_id;
        this.userForm.patchValue({
          user_id: res.user_id,
          first_name: res.first_name,
          last_name: res.last_name,
          email: res.email,
          phone_number: res.phone_number,
          is_active: res.is_active === 1 ? true : false,
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
  deleteUser(user_id: any) {
    console.log('Delete user_id:', user_id);
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
        this.userService.deleteUser(user_id).subscribe({
          next: (res: any) => {
            console.log(res);
            Swal.fire({
              title: "Deleted!",
              text: res?.message,
              icon: "success"
            });
            this.getAllUsers();
          }, error: (err: any) => {
            console.log(err);
            Swal.fire({
              title: "Deleted!",
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
    this.userForm.reset({
      is_active: true
    });
    this.visible = false;
    this.userId = null;
  }
}
