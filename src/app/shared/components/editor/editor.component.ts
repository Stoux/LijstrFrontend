import { Component, OnInit, ViewChild } from '@angular/core';
import { QuillConfig, QuillEditorComponent, QuillModules } from 'ngx-quill';
import { User } from '../../../core/models/user';
import { buildQuillConfig } from '../../config/quill-config';
import 'quill-mention';

@Component({
  selector: 'lijstr-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {

  @ViewChild(QuillEditorComponent, {static: true}) editor: QuillEditorComponent;

  public mentions: User[] = [
    {id: 1, displayName: 'Leon'},
    {id: 2, displayName: 'Erwin'},
  ];

  public current: string;
  public config: QuillConfig = buildQuillConfig({
    withMentions: {
      users: this.mentions,
      editor: () => this.editor,
    },
  });

  constructor() {
  }

  ngOnInit(): void {
  }

}
