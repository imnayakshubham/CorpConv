"use client"

import { useRef } from "react"
import { Plus, GripVertical, ArrowUp, ArrowDown, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Element item in sidebar
export const ElementItem = ({ element, onAddElement }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className="flex items-center gap-2 p-3 rounded-md cursor-pointer border hover:bg-muted/50 transition-colors"
            onClick={() => onAddElement(element.type)}
          >
            <div className="flex items-center justify-center w-8 h-8 rounded-md bg-primary/10 text-primary">
              {element.icon}
            </div>
            <span className="font-medium">{element.label}</span>
            <Plus className="ml-auto h-4 w-4 text-muted-foreground" />
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>Click to add</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

// Helper function to render element preview
const renderElementPreview = (element) => {
  switch (element.type) {
    case "text":
      return (
        <div className="space-y-2">
          <label className="text-sm font-medium">{element.label || "Text Field"}</label>
          <input
            type="text"
            placeholder={element.placeholder || "Enter text"}
            className="w-full p-2 border rounded-md"
            required={element.required}
          />
          {element.description && <p className="text-xs text-muted-foreground">{element.description}</p>}
        </div>
      )
    // Add other element type renderers here...
    default:
      return <div>Unknown element type</div>
  }
}

// Form element with reordering controls
export const FormElement = ({ element, index, moveElement, isSelected, onSelect, onRemove }) => {
  const ref = useRef(null)

  const borderStyle = isSelected ? "border-primary ring-1 ring-primary" : ""

  return (
    <div
      ref={ref}
      className={`p-4 border rounded-md cursor-pointer relative ${borderStyle} transition-all duration-200`}
      onClick={() => onSelect(index)}
    >
      <div className="absolute left-2 top-1/2 -translate-y-1/2 flex flex-col items-center justify-center gap-1 opacity-50 hover:opacity-100 transition-opacity">
        <GripVertical className="h-5 w-5 text-muted-foreground" />
        <div className="flex flex-col gap-0.5">
          <Button
            variant="ghost"
            size="icon"
            className="h-5 w-5 rounded-full"
            onClick={(e) => {
              e.stopPropagation()
              if (index > 0) moveElement(index, index - 1)
            }}
          >
            <ArrowUp className="h-3 w-3" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-5 w-5 rounded-full"
            onClick={(e) => {
              e.stopPropagation()
              moveElement(index, index + 1)
            }}
          >
            <ArrowDown className="h-3 w-3" />
          </Button>
        </div>
      </div>
      <div className="pl-8">{renderElementPreview(element)}</div>
      {isSelected && (
        <Button
          variant="destructive"
          size="icon"
          className="absolute -top-3 -right-3 h-6 w-6 rounded-full shadow-sm"
          onClick={(e) => {
            e.stopPropagation()
            onRemove(index)
          }}
        >
          <Trash2 className="h-3 w-3" />
        </Button>
      )}
    </div>
  )
}

