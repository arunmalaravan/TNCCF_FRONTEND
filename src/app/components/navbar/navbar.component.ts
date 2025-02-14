import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Menubar } from 'primeng/menubar';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { Toolbar } from 'primeng/toolbar';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { TextareaModule } from 'primeng/textarea';
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
  selector: 'app-navbar',
  imports: [Menubar, BadgeModule, AvatarModule, InputTextModule, CommonModule, CommonModule, ButtonModule, InputTextModule, TableModule, SelectModule, ToastModule, ToolbarModule, InputTextModule, TextareaModule, DropdownModule, InputTextModule, FormsModule, IconFieldModule, InputIconModule, FormsModule, ReactiveFormsModule, TagModule, DialogModule, CheckboxModule, Tooltip, PopoverModule, ConfirmDialogModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  items: MenuItem[] | undefined;
  darkMode: boolean = false;

  constructor() { }

  ngOnInit() {

    this.loadDarkMode();

    this.items = [
      {
        label: 'Scheme',
        icon: 'pi pi-cog',
        routerLink: '/scheme'
      },
      // {
      //   label: 'User',
      //   icon: 'pi pi-users',
      //   routerLink: '/user'
      // },
      {
        label: 'Company',
        icon: 'pi pi-building',
        routerLink: '/company'
      },
      {
        label: 'District',
        icon: 'pi pi-map',
        routerLink: '/district'
      },
      {
        label: 'Amount',
        icon: 'pi pi-money-bill',
        routerLink: '/amount'
      },
      {
        label: 'Company District Mapping',
        icon: 'pi pi-link',
        routerLink: '/company-district-mapping'
      }
    ];

  }
  toggleMode() {
    const element = document.documentElement;
    this.darkMode = !this.darkMode;
    if (this.darkMode) {
      element.classList.add('dark-mode');
    } else {
      element.classList.remove('dark-mode');
    }
    localStorage.setItem('darkMode', JSON.stringify(this.darkMode));
  }
  loadDarkMode() {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode !== null) {
      this.darkMode = JSON.parse(savedMode);
      if (this.darkMode) {
        document.documentElement.classList.add('dark-mode');
      }
    }
  }
}
