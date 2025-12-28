'use client';

import { Typography } from '@tiptap/extension-typography';
import { Markdown } from '@tiptap/markdown';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

type Props = {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
};

export const FieldMarkdown = ({ value, onChange, placeholder }: Props) => {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
      }),
      Markdown,
      Typography,
    ],
    content: value,
    contentType: 'markdown',
    editorProps: {
      attributes: {
        class:
          'min-h-[160px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring',
        placeholder: placeholder ?? 'Write job description here...',
      },
    },
    onUpdate: ({ editor }) => onChange(editor.getMarkdown()),
  });

  return (
    <div className="prose max-w-none">
      <EditorContent editor={editor} />
    </div>
  );
};
