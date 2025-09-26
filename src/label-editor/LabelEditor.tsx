// src/Tiptap.tsx
import { useEditor, EditorContent, EditorContext } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { TextStyleKit } from '@tiptap/extension-text-style';
import { useMemo } from 'react';
import MenuBar from './MenuBar';

import SampleRecipe from '../../recipe-sample.json';

export default function LabelEditor()
{
  const editor = useEditor({
    extensions: [TextStyleKit, StarterKit],
    content: SampleRecipe
  });

  // Memoize the provider value to avoid unnecessary re-renders
  const providerValue = useMemo(() => ({ editor }), [editor]);

  return (
    <EditorContext.Provider value={providerValue}>
      <div >
        <MenuBar editor={editor}/>
        <EditorContent
          id='recipe'
          className='border p-2 outline-none'
          editor={editor}
          placeholder='Hello World!'
        />
      </div>
    </EditorContext.Provider>
  )
}