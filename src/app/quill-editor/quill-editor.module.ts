import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuillEditorRoutingModule } from './quill-editor-routing.module';
import { QuillEditorComponent } from './quill-editor/quill-editor.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { QuillModule } from 'ngx-quill';

@NgModule({
  declarations: [QuillEditorComponent],
  imports: [
    CommonModule,
    QuillEditorRoutingModule,
    MatSnackBarModule,

    QuillModule
  ]
})
export class QuillEditorModule { }
