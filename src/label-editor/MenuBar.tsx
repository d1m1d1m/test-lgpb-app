import { BoldIcon, BugIcon, CaseLowerIcon, CaseUpperIcon, ItalicIcon, RedoIcon, StrikethroughIcon, UnderlineIcon, UndoIcon } from "lucide-react";
import { useEditorState, type Editor } from "@tiptap/react";
import { type FC } from "react";
import { Toggle } from "@/components/ui/toggle";
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
        isUnderlined: ctx.editor.isActive('underline') ?? false,
        canUnderlined: ctx.editor.can().chain().toggleUnderline().run() ?? false,
        canUndo: ctx.editor.can().chain().undo().run() ?? false,
        canRedo: ctx.editor.can().chain().redo().run() ?? false,
      }
    },
  });

  return(
    <div className="flex items-center px-2 py-1 gap-2 border border-b-0 bg-accent/5">

      {/* Gestion de la graisse de police */}
      <div className="flex gap-1">
        <Toggle
          className="cursor-pointer"
          size="sm"
          onPressedChange={() => editor.chain().focus().toggleBold().run()}
          disabled={!editorState.canBold}
          pressed={editorState.isBold}
        >
          <BoldIcon strokeWidth={editorState.isBold ? 3 : 2} className="w-4 h-4"/>
        </Toggle>

        <Toggle
          className="cursor-pointer"
          size="sm"
          onPressedChange={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editorState.canItalic}
          pressed={editorState.isItalic}
        >
          <ItalicIcon strokeWidth={editorState.isItalic ? 3 : 2} className="w-4 h-4"/>
        </Toggle>

        <Toggle
          className="cursor-pointer"
          size="sm"
          onPressedChange={() => editor.chain().focus().toggleUnderline().run()}
          disabled={!editorState.canUnderlined}
          pressed={editorState.isUnderlined}
        >
          <UnderlineIcon strokeWidth={editorState.isUnderlined ? 3 : 2} className="w-4 h-4"/>
        </Toggle>
      </div>

      <div className="h-6">
        <Separator orientation="vertical" />
      </div>

      {/* Gestion de la casse */}
      <div className="flex gap-1">
        <Toggle
          className="cursor-pointer"
          size="sm"
          onPressedChange={() => editor.chain().focus().toggleBold().run()}
          disabled={!editorState.canBold}
          pressed={editorState.isBold}
        >
          <CaseUpperIcon strokeWidth={editorState.isBold ? 3 : 2} className="w-4 h-4"/>
        </Toggle>

        <Toggle
          className="cursor-pointer"
          size="sm"
          onPressedChange={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editorState.canItalic}
          pressed={editorState.isItalic}
        >
          <CaseLowerIcon strokeWidth={editorState.isItalic ? 3 : 2} className="w-4 h-4"/>
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
    </div>
  );
}

export default MenuBar;