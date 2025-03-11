"use dom"

//Dom doesnt use nativewind
import Highlight from "@tiptap/extension-highlight"
import { Editor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import React from "react"
import "./TipTapStyles.css"
import type { DOMProps } from "expo/dom"

export type TiptapProps = {
  dom: DOMProps
  blur?: () => void
  bold?: () => void
  italic?: () => void
  underline?: () => void
  strike?: () => void
}

export default function TipTap({ dom, blur, bold, italic, underline, strike }: TiptapProps) {
  const editor = new Editor({
    content: "asddsa",

    extensions: [
      StarterKit.configure({
        bulletList: false,
        orderedList: false,
        listItem: false,
        blockquote: false,
        codeBlock: false,
        heading: false,
        horizontalRule: false,
      }),
      Highlight.configure({ multicolor: true, HTMLAttributes: { class: "color-white" } }),
    ],
    editorProps: {
      attributes: {
        class: "EditorProps",
      },
    },
    onUpdate: ({ editor }) => {
      // console.log(editor.getHTML())
    },
  })
  return (
    <div className="Wrapper">
      <EditorContent editor={editor} className="Editor" />
      <div className="Toolbar"></div>
    </div>
  )
}
