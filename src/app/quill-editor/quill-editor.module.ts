import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuillEditorRoutingModule } from './quill-editor-routing.module';
import { QuillEditorComponent } from './quill-editor/quill-editor.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { QuillModule } from 'ngx-quill';

@NgModule({
  declarations: [QuillEditorComponent],
  imports: [
    CommonModule,
    QuillEditorRoutingModule,
    MatSnackBarModule,
    FormsModule,
    ReactiveFormsModule,

    QuillModule
  ]
})
export class QuillEditorModule { }
