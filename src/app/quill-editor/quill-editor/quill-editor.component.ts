import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EditorChangeContent, EditorChangeSelection } from 'ngx-quill';
import 'quill-mention';
import 'quill-emoji';

import Quill from 'quill';
import ImageResize from 'quill-image-resize-module';
Quill.register('modules/imageResize', ImageResize);

@Component({
  selector: 'app-quill-editor',
  templateUrl: './quill-editor.component.html',
  styleUrls: ['./quill-editor.component.scss']
})
export class QuillEditorComponent implements OnInit {
  form = this.fb.group({
    editorContent: [''],
  });
  get editorContentControl() {
    return this.form.get('editorContent') as FormControl;
  }
  content: string;
  text = '<h2>ダミー投稿</h2><p>2020年7月16日更新：アップデートにより使いやすくなりました。</p><h1>概要</h1><p>Lorem psum dolor sit amet consectetur adipisicing elit. Nesciunt explicabo quae dolorum, a laudantium totam laboriosam iste! Atque, magni quibusdam labore rem impedit ut, aliquam ab, debitis deserunt nemo consequuntur.Lorem ipsum dolor sit amet consectetur adipisicing elit.</p><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt explicabo quae dolorum, a laudantium totam laboriosam iste! Atque, magni quibusdam labore rem impedit ut, aliquam ab, debitis deserunt nemo consequuntur.</p><h3>イメージ</h3><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt explicabo quae dolorum, a laudantium totam laboriosam iste!</p><h2>結論</h2><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt explicabo quae dolorum, a laudantium totam laboriosam iste!</p>';

  quillEditorRef: any;
  quillFileInput = document.createElement('input');

  atValues = [
    { id: 1, value: 'komura', link: 'https://google.com' },
    { id: 2, value: 'nino' },
    { id: 3, value: 'goto' },
    { id: 4, value: 'saito' }
  ];
  hashValues = [
    { id: 5, value: 'komura 2' },
    { id: 6, value: 'goto 2' }
  ];

  modules = {
    toolbar: {
      container: [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote', 'code-block'],

        [{ header: 1 }, { header: 2 }],               // custom button values
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ script: 'sub' }, { script: 'super' }],      // superscript/subscript
        [{ indent: '-1' }, { indent: '+1' }],          // outdent/indent
        [{ direction: 'rtl' }],                         // text direction

        [{ size: ['small', false, 'large', 'huge'] }],  // custom dropdown
        [{ header: [1, 2, 3, 4, 5, 6, false] }],

        [{ color: [] }, { background: [] }],          // dropdown with defaults from theme
        [{ font: [] }],
        [{ align: [] }],

        ['clean'],                                         // remove formatting button

        ['link', 'image', 'video'],                         // link and image, video
        ['emoji']
      ],
      handlers: {
        image: (isEmit: boolean) => {
          if (isEmit) {
            this.quillFileInput.setAttribute('type', 'file');
            this.quillFileInput.setAttribute('accept', 'image/*');
            this.quillFileInput.addEventListener('change', (event) => {
              this.quillFileUpload(event);
            });
            this.quillFileInput.click();
          }
        }
      }
    },
    imageResize: true,
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
    },
    keyboard: {
      bindings: {
        shiftEnter: {
          key: 13,
          shiftKey: true,
          handler: (range, context) => {
            // Handle shift+enter
            console.log('shift+enter');
          }
        },
        enter: {
          key: 13,
          handler: (range, context) => {
            console.log('enter');
            return true;
          }
        }
      }
    }
  };
  blured = false;
  focused = false;

  constructor(
    private fb: FormBuilder,
    private ngZone: NgZone,
    private snackBar: MatSnackBar
  ) { }

  created(quill) {
    this.quillEditorRef = quill;
    console.log('editor-created', quill);
  }

  changedEditor(event: EditorChangeContent | EditorChangeSelection) {
    console.log('editor-change', event);
  }

  focus($event) {
    console.log('focus', $event);
    this.focused = true;
    this.blured = false;
  }

  blur($event) {
    console.log('blur', $event);
    this.focused = false;
    this.blured = true;
  }

  addBindingCreated(quill) {
    quill.keyboard.addBinding({
      key: 'b'
    }, (range, context) => {
      console.log('KEYBINDING B', range, context);
    });

    quill.keyboard.addBinding({
      key: 'B',
      shiftKey: true
    }, (range, context) => {
      console.log('KEYBINDING SHIFT + B', range, context);
    });
  }

  quillFileUpload(event) {
    if (event.target.files.length) {
      const file = event.target.files[0];
      console.log(file);
      const fileSizeLimit = 3000000;
      if (file.size < fileSizeLimit) {
        // const downloadURLPromise = this.imageService.uploadImage(
        //   userId,
        //   file
        // );
        // insertEmbedイベントを使って画像を挿入
        // downloadURLPromise.then((downloadURL) => {
        //   this.quillEditorRef.insertEmbed(0, 'image', downloadURL, 'user');
        // });
        this.quillEditorRef.insertEmbed(0, 'image', file, 'user');
        return;
      } else {
        this.ngZone.run(() => {
          const msg = '３メガバイト未満の画像を利用してください';
          this.snackBar.open(msg, '閉じる');
        });
        return;
      }
    }
  }

  ngOnInit(): void {
  }

}
