import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ContactsEditorPage } from './contacts-editor.page';
import { MaskDirective } from 'src/app/directives/mask.directive';

const routes: Routes = [
  {
    path: '',
    component: ContactsEditorPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ContactsEditorPage,
    MaskDirective]
})
export class ContactsEditorPageModule { }
