import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { EditorChangeContent, EditorChangeSelection } from 'ngx-quill';
import 'quill-mention';
import 'quill-emoji';

@Component({
  selector: 'app-quill-editor',
  templateUrl: './quill-editor.component.html',
  styleUrls: ['./quill-editor.component.scss']
})
export class QuillEditorComponent implements OnInit {
  @ViewChild('imageInput') private imageInput: ElementRef<HTMLElement>;
  form = this.fb.group({
    editorContent: [''],
  });
  get editorContentControl() {
    return this.form.get('editorContent') as FormControl;
  }

  editorInstance: any;
  atValues = [
    { id: 1, value: 'hanako', link: 'https://google.com' },
    { id: 2, value: 'tarou' },
    { id: 3, value: 'satoshi' },
  ];
  hashValues = [
    { id: 5, value: 'cat' },
    { id: 6, value: 'dog' },
    { id: 7, value: 'music' }
  ];
  modules = {
    toolbar: {
      container: [
        ['bold', 'italic', 'underline', 'strike'], // toggled buttons
        ['blockquote', 'code-block'],
        [{ header: 1 }, { header: 2 }], // custom button values
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
        [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
        [{ direction: 'rtl' }], // text direction
        [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ color: [] }, { background: [] }], // dropdown with defaults from theme
        [{ font: [] }],
        [{ align: [] }],
        ['clean'], // remove formatting button
        ['link', 'image', 'video'], // link and image, video
        ['emoji']
      ],
      handlers: {
        image: this.selectImage.bind(this),
      }
    },
    'emoji-shortname': true,
    'emoji-textarea': true,
    'emoji-toolbar': true,
    mention: {
      allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
      mentionDenotationChars: ['@', '#'],
      source: (searchTerm, renderList, mentionChar) => {
        let values;
        if (mentionChar === '@') {
          values = this.atValues;
        } else {
          values = this.hashValues;
        }
        if (searchTerm.length === 0) {
          renderList(values, searchTerm);
        } else {
          const matches = [];
          for (const i of values.length) {
            if (values[i].value.toLowerCase().indexOf(searchTerm.toLowerCase())) {
              matches.push(values[i]);
            }
          }
          renderList(matches, searchTerm);
        }
      },
    }
  };

  constructor(
    private fb: FormBuilder,
  ) { }

  created(editorInstance) {
    this.editorInstance = editorInstance;
    console.log('editor-created', editorInstance);
  }

  changedEditor(event: EditorChangeContent | EditorChangeSelection) {
    console.log('editor-change', event);
  }

  selectImage() {
    this.imageInput.nativeElement.click();
  }

  async uploadAndInsertImage({ target }: { target: HTMLInputElement }) {
    const image = target.files[0];
    console.log(image);
    const selection = this.editorInstance.getSelection();
    console.log(selection);
    // this.editorInstance.insertEmbed(selection.index, 'image', imageURL);
  }

  ngOnInit(): void {
  }
}
