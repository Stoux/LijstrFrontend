import { QuillConfig, QuillEditorComponent, QuillModules } from 'ngx-quill';
import { User } from '../../core/models/user';

import 'quill-mention';
import 'quill-emoji/dist/quill-emoji';

export interface QuillOperations {
  ops: (QuillTextOperation | QuillEmojiOperation | QuillListOperation)[];
}

/**
 * Specifies that a text operation should be added.
 */
export interface QuillTextOperation {
  insert: string;
  attributes?: {
    underline?: boolean,
    strike?: boolean;
    italic?: boolean;
    bold?: boolean;
    script?: 'super' | 'sub',
    link?: string,
  };
}

/**
 * Specifies that an emoji should be inserted.
 */
export interface QuillEmojiOperation {
  insert: {
    emoji: string;
  };
}

/**
 * Note that the content (insert) of this is always just a new line.
 * This operation applies to the previous <strong>line</strong>, look for the previous '\n' in any of the inserts before this.
 */
export interface QuillListOperation {
  insert: '\n';
  attributes: {
    list: 'ordered' | 'bullet';
  };
}



interface BuildOptions {
  withMentions?: {
    users: User[],
    editor: () => QuillEditorComponent
  };
  withEmojis?: boolean;
}

export function buildQuillModules(options: BuildOptions): QuillModules {
  const config: QuillModules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      [{list: 'ordered'}, {list: 'bullet'}],
      [{script: 'sub'}, {script: 'super'}],
      ['link'],
      ['clean'],
    ]
  };

  if (options) {
    if (options.withMentions) {
      // Init the mention module
      const resolveEditor = options.withMentions.editor;
      const users: { id: number, value: string }[] = options.withMentions.users.map(user => {
        return {
          id: user.id,
          value: user.displayName
        };
      });

      // Add the module
      config.mention = {
        // Names can contain any a-z & spaces
        allowedChars: /^[a-zA-Z\s]*$/,
        dataAttributes: ['id', 'displayName', 'denotationChar', 'link', 'target'],

        onSelect: (item: any, insertItem: (item: any) => void) => {
          const editor = resolveEditor().quillEditor;
          insertItem(item);
          editor.insertText(editor.getLength() - 1, '', 'user');
        },

        source: (searchTerm: string, renderList: (matches: any[], searchTerm: string) => void) => {
          searchTerm = searchTerm.toLowerCase();
          renderList(
            searchTerm.length === 0
              ? users
              : users.filter(user => user.value.toLowerCase().indexOf(searchTerm) !== -1),
            searchTerm
          );
        },
      };
    }

    if (options.withEmojis) {
      config['emoji-shortname'] = true;
      config['emoji-textarea'] = true;
      config['emoji-toolbar'] = true;
    }
  }


  return config;
}
