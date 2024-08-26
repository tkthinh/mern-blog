import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css';

import { modules, formats } from '../libs/quill-utils';
import { useEffect } from 'react';

interface QuillEditorProps {
  content: string;
  setContent: (content: string) => void;
}

export default function Quill({ content, setContent }: QuillEditorProps) {
  const { quill, quillRef } = useQuill({ modules, formats });

  useEffect(() => {
    if (quill) {
      quill.on('text-change', () => {
        setContent(quill.root.innerHTML);
      });
    }
  }, [quill, content, setContent]);

  return <div ref={quillRef}></div>;
}
