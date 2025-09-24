// src/Tiptap.tsx
import { useEditor, EditorContent, EditorContext } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { TextStyleKit } from '@tiptap/extension-text-style';
import { useMemo } from 'react';
import MenuBar from './MenuBar';

import SampleRecipe from '../../recipe-sample.json';
import { Label } from '@/components/ui/label';

const LabelEditor = () => {
  const editor = useEditor({
    extensions: [TextStyleKit, StarterKit],
    content: SampleRecipe
  });

  // Memoize the provider value to avoid unnecessary re-renders
  const providerValue = useMemo(() => ({ editor }), [editor]);

  return (
    <EditorContext.Provider value={providerValue}>
      <div className='mx-6'>
        <Label>Editeur</Label>
        <MenuBar editor={editor}/>
        <EditorContent className='border p-2 outline-none' editor={editor} placeholder='Hello World!' />
      </div>
    </EditorContext.Provider>
  )
}

export default LabelEditor;