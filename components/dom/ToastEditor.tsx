"use dom"
import { type Editor, useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Placeholder from "@tiptap/extension-placeholder"
import { useCallback, type FC } from "react"

interface MenuBarProps {
  editor: Editor | null
}

interface ToolbarButtonProps {
  onClick: () => boolean
  isActive: boolean
  children: React.ReactNode
}

const ToolbarButton: FC<ToolbarButtonProps> = ({ onClick, isActive, children }) => (
  <button
    onClick={() => onClick()}
    className={`px-3 py-1 rounded text-sm ${
      isActive ? "bg-blue-500 text-white" : "bg-white border border-gray-300"
    }`}
    type="button"
  >
    {children}
  </button>
)

const MenuBar: FC<MenuBarProps> = ({ editor }) => {
  if (!editor) {
    return null
  }

  const toolbarItems: Array<{
    onClick: () => boolean
    isActive: boolean
    label: string
  }> = [
    {
      onClick: () => editor.chain().focus().toggleBold().run(),
      isActive: editor.isActive("bold"),
      label: "B",
    },
    {
      onClick: () => editor.chain().focus().toggleItalic().run(),
      isActive: editor.isActive("italic"),
      label: "I",
    },
    {
      onClick: () => editor.chain().focus().toggleBulletList().run(),
      isActive: editor.isActive("bulletList"),
      label: "•",
    },
    {
      onClick: () => editor.chain().focus().toggleOrderedList().run(),
      isActive: editor.isActive("orderedList"),
      label: "1.",
    },
    {
      onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      isActive: editor.isActive("heading", { level: 2 }),
      label: "H2",
    },
  ]

  return (
    <div className="flex flex-wrap gap-1 p-2 border-b border-gray-200 bg-gray-50">
      {toolbarItems.map((item, index) => (
        <ToolbarButton key={`toolbar-${index}`} onClick={item.onClick} isActive={item.isActive}>
          {item.label}
        </ToolbarButton>
      ))}
    </div>
  )
}

interface EditorProps {
  initialContent?: string
  placeholder?: string
  onSave?: (content: string) => void
  className?: string
}

const MobileTiptapEditor: FC<EditorProps> = ({
  initialContent = "<p>Hello World! 🌎</p>",
  placeholder = "Write something...",
  onSave,
  className = "",
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
    ],
    content: initialContent,
    editorProps: {
      attributes: {
        class: "prose prose-sm sm:prose focus:outline-none min-h-[200px] px-4 py-2",
      },
    },
  })

  const handleContent = useCallback(() => {
    if (editor && onSave) {
      const content = editor.getHTML()
      onSave(content)
    }
  }, [editor, onSave])

  return (
    <div
      className={`w-full max-w-2xl mx-auto border rounded-lg overflow-hidden shadow-sm bg-white ${className}`}
    >
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
      {onSave && (
        <div className="p-2 border-t border-gray-200 bg-gray-50">
          <button
            onClick={handleContent}
            className="px-4 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
            type="button"
          >
            Save
          </button>
        </div>
      )}
    </div>
  )
}

export default MobileTiptapEditor
