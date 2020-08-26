import { QuillConfig, QuillEditorComponent } from 'ngx-quill';
import { User } from '../../core/models/user';

interface BuildOptions {
  withMentions?: {
    users: User[],
    editor: () => QuillEditorComponent
  };
}

export function buildQuillConfig(options: BuildOptions): QuillConfig {
  const config: QuillConfig = {
    modules: {
      toolbar: [
        ['bold', 'italic', 'underline', 'strike'],
        [{list: 'ordered'}, {list: 'bullet'}],
        [{script: 'sub'}, {script: 'super'}],
        ['link'],
        ['clean'],
      ]
    },
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
      config.modules.mention = {
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
  }


  return config;
}
