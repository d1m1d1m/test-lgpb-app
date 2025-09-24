import { BoldIcon, BugIcon, ItalicIcon, RedoIcon, StrikethroughIcon, TvIcon, UndoIcon } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";
import { useEditorState, type Editor } from "@tiptap/react";
import { useEffect, type FC } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface MenuBarProps {
  editor: Editor
}

const MenuBar : FC<MenuBarProps> = ({ editor }) => {
  const editorState = useEditorState({
    editor,
    selector: (ctx) => {
      return {
        isBold: ctx.editor.isActive('bold') ?? false,
        canBold: ctx.editor.can().chain().toggleBold().run() ?? false,
        isItalic: ctx.editor.isActive('italic') ?? false,
        canItalic: ctx.editor.can().chain().toggleItalic().run() ?? false,
        isStrike: ctx.editor.isActive('strike') ?? false,
        canStrike: ctx.editor.can().chain().toggleStrike().run() ?? false,
        canUndo: ctx.editor.can().chain().undo().run() ?? false,
        canRedo: ctx.editor.can().chain().redo().run() ?? false,
      }
    },
  });

  return(
    <div className="flex items-center p-1 gap-2 border border-b-0 bg-accent/5">
      <div className="flex gap-1">
        <Toggle
          className="cursor-pointer"
          onPressedChange={() => editor.chain().focus().toggleBold().run()}
          disabled={!editorState.canBold}
          pressed={editorState.isBold}
        >
          <BoldIcon strokeWidth={editorState.isBold ? 3 : 2} className="w-4 h-4"/>
        </Toggle>

        <Toggle
          className="cursor-pointer"
          onPressedChange={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editorState.canItalic}
          pressed={editorState.isItalic}
        >
          <ItalicIcon strokeWidth={editorState.isItalic ? 3 : 2} className="w-4 h-4"/>
        </Toggle>

        <Toggle
          className="cursor-pointer"
          onPressedChange={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editorState.canStrike}
          pressed={editorState.isStrike}
        >
          <StrikethroughIcon strokeWidth={editorState.isStrike ? 3 : 2} className="w-4 h-4"/>
        </Toggle>
      </div>

      <div className="h-6">
        <Separator orientation="vertical" />
      </div>

      <div className="flex gap-1">
        <Button
          variant="ghost"
          className="cursor-pointer"
          disabled={!editorState.canUndo}
          onClick={() => editor.chain().focus().undo().run()}
        >
          <UndoIcon className="w-4 h-4"/>
        </Button>
        <Button
          variant="ghost"
          className="cursor-pointer"
          disabled={!editorState.canRedo}
          onClick={() => editor.chain().focus().redo().run()}
        >
          <RedoIcon className="w-4 h-4"/>
        </Button>
      </div>

      <div className="flex gap-1">
        <Button
          variant="default"
          className="cursor-pointer"
          onClick={() => console.log(editor.getJSON())}
        >
          <BugIcon className="w-4 h-4"/>
        </Button>
      </div>
    </div>
  );
}

export default MenuBar;