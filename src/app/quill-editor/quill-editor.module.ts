import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuillEditorRoutingModule } from './quill-editor-routing.module';
import { QuillEditorComponent } from './quill-editor/quill-editor.component';


@NgModule({
  declarations: [QuillEditorComponent],
  imports: [
    CommonModule,
    QuillEditorRoutingModule
  ]
})
export class QuillEditorModule { }
