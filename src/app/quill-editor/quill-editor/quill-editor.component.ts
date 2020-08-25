import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EditorChangeContent, EditorChangeSelection } from 'ngx-quill';

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
  modules = {
    // 'emoji-shortname': true,
    // 'emoji-textarea': true,
    // 'emoji-toolbar': true,
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

        ['link', 'image', 'video']                         // link and image, video
        // ['emoji']
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
