import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { QuillEditorComponent, QuillModules } from 'ngx-quill';
import { User } from '../../../core/models/user';
import { buildQuillModules, QuillOperations } from '../../config/quill-config';
import { ContentChange } from 'ngx-quill/lib/quill-editor.component';

@Component({
  selector: 'lijstr-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {

  @ViewChild(QuillEditorComponent, {static: true}) editor: QuillEditorComponent;
  @Input() protected mentions: User[];
  @Input() protected withEmojis = true;
  @Input() public spoilers: { enable: boolean, isDefault: boolean } = {
    enable: true,
    isDefault: true,
  };
  public modules: QuillModules;

  @Input() public placeholder = '';
  @Input() public submitButton: string = undefined;

  public current: QuillOperations;
  public isSpoiler: boolean;
  public isSubmitting: boolean;

  public originalHtml: string;
  public currentHtml: string;

  @Output() submitPressed = new EventEmitter<SubmitEvent>();
  // TODO: Listen to changes to `inputModel` and waterfall them to `current`
  @Input() inputModel: string | QuillOperations;
  // TODO: Listen to changes in `current` and emit them to external parties
  @Output() inputModelChange = new EventEmitter<QuillOperations>();

  constructor() {

  }

  ngOnInit(): void {
    this.current = {ops: []};
    this.modules = buildQuillModules({
      withMentions: this.mentions ? {
        users: this.mentions,
        editor: () => this.editor,
      } : undefined,
      withEmojis: this.withEmojis,
    });
    this.isSpoiler = this.spoilers && this.spoilers.isDefault;
    this.originalHtml = null;
    this.currentHtml = null;
    this.isSubmitting = false;

  }

  public onContentChanged(change: ContentChange): void {
    this.currentHtml = change.html;
  }

  public emitSubmit(): void {
    this.isSubmitting = true;
    this.submitPressed.emit({
      data: this.current,
      isSpoiler: this.isSpoiler,
      unlockButton: (wipeContent) => {
        this.isSubmitting = false;
        if (wipeContent) {
          this.current = {ops: []};
        }
      },
    });
  }

}

export interface SubmitEvent {
  data: QuillOperations;
  isSpoiler: boolean;
  unlockButton: (wipeContent?: boolean) => void;
}
