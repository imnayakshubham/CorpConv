"use client"

import { useState, useCallback, useRef } from "react"
import {
  AlignLeft,
  CheckSquare,
  FileInput,
  ListOrdered,
  Mail,
  Phone,
  Type,
  Calendar,
  Star,
  Hash,
  Image,
  Trash2,
  GripVertical,
  Plus,
  ArrowUp,
  ArrowDown,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ElementProperties } from "./element-properties"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { TemplateGallery } from "./templates"
import { cn } from "@/utils/utils"

// Define element types
const ELEMENT_TYPES = {
  TEXT: "text",
  TEXTAREA: "textarea",
  EMAIL: "email",
  PHONE: "phone",
  NUMBER: "number",
  SELECT: "select",
  CHECKBOX: "checkbox",
  RADIO: "radio",
  FILE: "file",
  DATE: "date",
  RATING: "rating",
  IMAGE: "image",
}

const FORM_ELEMENTS = [
  { type: ELEMENT_TYPES.TEXT, icon: <Type className="h-4 w-4" />, label: "Text" },
  { type: ELEMENT_TYPES.TEXTAREA, icon: <AlignLeft className="h-4 w-4" />, label: "Paragraph" },
  { type: ELEMENT_TYPES.EMAIL, icon: <Mail className="h-4 w-4" />, label: "Email" },
  { type: ELEMENT_TYPES.PHONE, icon: <Phone className="h-4 w-4" />, label: "Phone" },
  { type: ELEMENT_TYPES.NUMBER, icon: <Hash className="h-4 w-4" />, label: "Number" },
  { type: ELEMENT_TYPES.SELECT, icon: <ListOrdered className="h-4 w-4" />, label: "Dropdown" },
  { type: ELEMENT_TYPES.CHECKBOX, icon: <CheckSquare className="h-4 w-4" />, label: "Checkbox" },
  { type: ELEMENT_TYPES.RADIO, icon: <ListOrdered className="h-4 w-4" />, label: "Radio" },
  { type: ELEMENT_TYPES.DATE, icon: <Calendar className="h-4 w-4" />, label: "Date" },
  { type: ELEMENT_TYPES.RATING, icon: <Star className="h-4 w-4" />, label: "Rating" },
]

// Element item in sidebar with drag functionality
const ElementItem = ({ element, onAddElement }) => {
  const elementRef = useRef(null)
  const [isDragging, setIsDragging] = useState(false)

  const handleDragStart = (e) => {
    // Store the element type in the dataTransfer object
    e.dataTransfer.setData("text/plain", element.type)

    // Create a custom drag image
    const dragImage = document.createElement("div")
    dragImage.innerHTML = `
      <div class="flex items-center gap-2 p-3 rounded-md border bg-white shadow-lg">
        <div class="flex items-center justify-center w-8 h-8 rounded-md bg-primary/10 text-primary">
          ${element.icon.type === Type ? '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 7 4 4 20 4 20 7"></polyline><line x1="9" y1="20" x2="15" y2="20"></line><line x1="12" y1="4" x2="12" y2="20"></line></svg>' : ""}
        </div>
        <span class="font-medium">${element.label}</span>
      </div>
    `
    document.body.appendChild(dragImage)
    dragImage.style.position = "absolute"
    dragImage.style.top = "-1000px"
    dragImage.style.opacity = "0"

    // Set the drag image
    e.dataTransfer.setDragImage(dragImage, 0, 0)

    // Set effect allowed
    e.dataTransfer.effectAllowed = "copy"

    // Set state
    setIsDragging(true)

    // Clean up the drag image after a short delay
    setTimeout(() => {
      document.body.removeChild(dragImage)
    }, 0)
  }

  const handleDragEnd = () => {
    setIsDragging(false)
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            ref={elementRef}
            className={cn(
              "flex items-center gap-2 p-3 rounded-md cursor-grab border hover:bg-muted/50 transition-all duration-200",
              isDragging && "opacity-50 border-primary",
            )}
            onClick={() => onAddElement(element.type)}
            draggable="true"
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            <div className="flex items-center justify-center w-8 h-8 rounded-md bg-primary/10 text-primary">
              {element.icon}
            </div>
            <span className="font-medium">{element.label}</span>
            <Plus className="ml-auto h-4 w-4 text-muted-foreground" />
          </div>
        </TooltipTrigger>
        <TooltipContent side="right">
          <p>Drag to add or click</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

// Helper function to render element preview
const renderElementPreview = (element) => {
  switch (element.type) {
    case ELEMENT_TYPES.TEXT:
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
    case ELEMENT_TYPES.TEXTAREA:
      return (
        <div className="space-y-2">
          <label className="text-sm font-medium">{element.label || "Paragraph Field"}</label>
          <textarea
            placeholder={element.placeholder || "Enter text"}
            className="w-full p-2 border rounded-md"
            rows={3}
            required={element.required}
          />
          {element.description && <p className="text-xs text-muted-foreground">{element.description}</p>}
        </div>
      )
    case ELEMENT_TYPES.EMAIL:
      return (
        <div className="space-y-2">
          <label className="text-sm font-medium">{element.label || "Email Field"}</label>
          <input
            type="email"
            placeholder={element.placeholder || "Enter email"}
            className="w-full p-2 border rounded-md"
            required={element.required}
          />
          {element.description && <p className="text-xs text-muted-foreground">{element.description}</p>}
        </div>
      )
    case ELEMENT_TYPES.PHONE:
      return (
        <div className="space-y-2">
          <label className="text-sm font-medium">{element.label || "Phone Field"}</label>
          <input
            type="tel"
            placeholder={element.placeholder || "Enter phone number"}
            className="w-full p-2 border rounded-md"
            required={element.required}
          />
          {element.description && <p className="text-xs text-muted-foreground">{element.description}</p>}
        </div>
      )
    case ELEMENT_TYPES.NUMBER:
      return (
        <div className="space-y-2">
          <label className="text-sm font-medium">{element.label || "Number Field"}</label>
          <input
            type="number"
            placeholder={element.placeholder || "Enter number"}
            className="w-full p-2 border rounded-md"
            min={element.min}
            max={element.max}
            required={element.required}
          />
          {element.description && <p className="text-xs text-muted-foreground">{element.description}</p>}
        </div>
      )
    case ELEMENT_TYPES.SELECT:
      return (
        <div className="space-y-2">
          <label className="text-sm font-medium">{element.label || "Dropdown Field"}</label>
          <select className="w-full p-2 border rounded-md" required={element.required}>
            <option value="" disabled selected>
              {element.placeholder || "Select an option"}
            </option>
            {(element.options || ["Option 1", "Option 2", "Option 3"]).map((option, i) => (
              <option key={i} value={option}>
                {option}
              </option>
            ))}
          </select>
          {element.description && <p className="text-xs text-muted-foreground">{element.description}</p>}
        </div>
      )
    case ELEMENT_TYPES.CHECKBOX:
      return (
        <div className="space-y-2">
          <label className="text-sm font-medium">{element.label || "Checkbox Field"}</label>
          <div className="space-y-1">
            {(element.options || ["Option 1", "Option 2", "Option 3"]).map((option, i) => (
              <div key={i} className="flex items-center gap-2">
                <input type="checkbox" id={`checkbox-preview-${i}`} />
                <label htmlFor={`checkbox-preview-${i}`}>{option}</label>
              </div>
            ))}
          </div>
          {element.description && <p className="text-xs text-muted-foreground">{element.description}</p>}
        </div>
      )
    case ELEMENT_TYPES.RADIO:
      return (
        <div className="space-y-2">
          <label className="text-sm font-medium">{element.label || "Radio Field"}</label>
          <div className="space-y-1">
            {(element.options || ["Option 1", "Option 2", "Option 3"]).map((option, i) => (
              <div key={i} className="flex items-center gap-2">
                <input type="radio" name="radio-preview" id={`radio-preview-${i}`} />
                <label htmlFor={`radio-preview-${i}`}>{option}</label>
              </div>
            ))}
          </div>
          {element.description && <p className="text-xs text-muted-foreground">{element.description}</p>}
        </div>
      )
    case ELEMENT_TYPES.FILE:
      return (
        <div className="space-y-2">
          <label className="text-sm font-medium">{element.label || "File Upload"}</label>
          <input type="file" className="w-full p-2 border rounded-md" required={element.required} />
          {element.description && <p className="text-xs text-muted-foreground">{element.description}</p>}
        </div>
      )
    case ELEMENT_TYPES.DATE:
      return (
        <div className="space-y-2">
          <label className="text-sm font-medium">{element.label || "Date Field"}</label>
          <input type="date" className="w-full p-2 border rounded-md" required={element.required} />
          {element.description && <p className="text-xs text-muted-foreground">{element.description}</p>}
        </div>
      )
    case ELEMENT_TYPES.RATING:
      return (
        <div className="space-y-2">
          <label className="text-sm font-medium">{element.label || "Rating"}</label>
          <div className="flex gap-1">
            {Array.from({ length: element.maxRating || 5 }).map((_, i) => (
              <Star
                key={i}
                className="h-6 w-6 stroke-muted-foreground cursor-pointer hover:fill-primary hover:stroke-primary"
              />
            ))}
          </div>
          {element.description && <p className="text-xs text-muted-foreground">{element.description}</p>}
        </div>
      )
    case ELEMENT_TYPES.IMAGE:
      return (
        <div className="space-y-2">
          <label className="text-sm font-medium">{element.label || "Image"}</label>
          <div className="border rounded-md p-4 flex items-center justify-center">
            <img
              src={element.src || "/placeholder.svg?height=200&width=300"}
              alt={element.alt || "Image"}
              className="max-h-40 object-contain"
            />
          </div>
          {element.description && <p className="text-xs text-muted-foreground">{element.description}</p>}
        </div>
      )
    default:
      return <div>Unknown element type</div>
  }
}

// Form element with drag and drop reordering
const FormElement = ({
  element,
  index,
  moveElement,
  isSelected,
  onSelect,
  onRemove,
  onDragStart,
  onDragOver,
  onDragEnd,
  onDrop,
  isDragging,
  isDropTarget,
}) => {
  const elementRef = useRef(null)

  const handleDragStart = (e) => {
    e.dataTransfer.setData("application/json", JSON.stringify({ index, type: "reorder" }))
    e.dataTransfer.effectAllowed = "move"

    // Add a slight delay to make the drag image visible
    setTimeout(() => {
      if (elementRef.current) {
        elementRef.current.classList.add("opacity-50")
      }
    }, 0)

    onDragStart(index)
  }

  const handleDragEnd = () => {
    if (elementRef.current) {
      elementRef.current.classList.remove("opacity-50")
    }
    onDragEnd()
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"
    onDragOver(index)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    console.log({ index })
    onDrop(index)
  }

  return (
    <div
      ref={elementRef}
      className={cn(
        "p-4 border rounded-md cursor-pointer relative transition-all duration-200",
        isSelected && "border-primary ring-1 ring-primary",
        isDragging && index === isDragging && "opacity-50",
        isDropTarget && "border-primary border-2 bg-primary/5",
        "group hover:shadow-md",
      )}
      onClick={() => onSelect(index)}
      draggable="true"
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className="absolute left-2 top-1/2 -translate-y-1/2 flex flex-col items-center justify-center gap-1 opacity-50 group-hover:opacity-100 transition-opacity">
        <div className="p-1 rounded-md hover:bg-muted cursor-grab">
          <GripVertical className="h-5 w-5 text-muted-foreground" />
        </div>
        <div className="flex flex-col gap-0.5">
          <Button
            variant="ghost"
            size="icon"
            className="h-5 w-5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
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
            className="h-5 w-5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
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

export function FormBuilder({
  formElements,
  setFormElements,
  selectedElement,
  setSelectedElement,
  viewMode,
  setFormTitle,
}) {
  const [activeTab, setActiveTab] = useState("elements")
  const [isDragging, setIsDragging] = useState(null)
  const [dropTarget, setDropTarget] = useState(null)
  const [showDropIndicator, setShowDropIndicator] = useState(false)
  const [dropIndicatorPosition, setDropIndicatorPosition] = useState(null)
  const dropAreaRef = useRef(null)
  const formElementsRef = useRef(null)

  // Function to add a new element
  const addNewElement = useCallback(
    (type) => {
      const newElement = {
        type: type,
        id: `element-${Date.now()}`,
        label: "",
        placeholder: "",
        required: false,
        options:
          type === ELEMENT_TYPES.SELECT || type === ELEMENT_TYPES.CHECKBOX || type === ELEMENT_TYPES.RADIO
            ? ["Option 1", "Option 2", "Option 3"]
            : undefined,
        maxRating: type === ELEMENT_TYPES.RATING ? 5 : undefined,
      }

      // Add the new element to the form with animation
      setFormElements((prevElements) => [...prevElements, newElement])

      // Select the newly added element
      setTimeout(() => {
        setSelectedElement(formElements.length)

        // Scroll to the new element
        if (formElementsRef.current) {
          const newElementNode = formElementsRef.current.lastChild
          if (newElementNode) {
            newElementNode.scrollIntoView({ behavior: "smooth", block: "center" })
          }
        }
      }, 50)
    },
    [formElements.length, setFormElements, setSelectedElement],
  )

  const handleSelectElement = useCallback(
    (index) => {
      setSelectedElement(index)
    },
    [setSelectedElement],
  )

  const handleRemoveElement = useCallback(
    (index) => {
      setFormElements((prevElements) => {
        const newElements = [...prevElements]
        newElements.splice(index, 1)
        return newElements
      })
      setSelectedElement(null)
    },
    [setFormElements, setSelectedElement],
  )

  const handleUpdateElement = useCallback(
    (updatedElement) => {
      if (selectedElement === null) return

      setFormElements((prevElements) => {
        const newElements = [...prevElements]
        console.log({ newElements, selectedElement, updatedElement })
        newElements[selectedElement] = {
          ...newElements[selectedElement],
          ...updatedElement,
        }
        return newElements
      })
    },
    [selectedElement, setFormElements],
  )

  const moveElement = useCallback(
    (fromIndex, toIndex) => {
      // Don't move if out of bounds
      if (toIndex < 0 || toIndex >= formElements.length) return

      setFormElements((prevElements) => {
        const newElements = [...prevElements]
        const [movedElement] = newElements.splice(fromIndex, 1)
        newElements.splice(toIndex, 0, movedElement)
        return newElements
      })

      // Update selected element index if it was moved
      if (selectedElement === fromIndex) {
        setSelectedElement(toIndex)
      }
    },
    [formElements.length, selectedElement, setFormElements, setSelectedElement],
  )

  const handleSelectTemplate = useCallback(
    (template) => {
      // Set the form title
      if (setFormTitle) {
        setFormTitle(template.name)
      }

      // Set the form elements from the template
      setFormElements(
        template.elements.map((element) => ({
          ...element,
          id: `element-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        })),
      )

      // Reset selected element
      setSelectedElement(null)

      // Switch to elements tab
      setActiveTab("elements")
    },
    [setFormElements, setFormTitle, setSelectedElement],
  )

  const getCanvasWidth = () => {
    switch (viewMode) {
      case "mobile":
        return "max-w-lg"
      case "tablet":
        return "max-w-2xl"
      case "desktop":
        return "max-w-3xl"
      default:
        return "max-w-lg"
    }
  }

  // Handle drag events for the drop area
  const handleDragOver = (e) => {
    e.preventDefault()
    console.log("hello")

    if (dropAreaRef.current) {
      dropAreaRef.current.classList.add("border-primary", "bg-primary/5")
    }

    setShowDropIndicator(true)

    // Calculate drop indicator position
    if (formElementsRef.current && formElementsRef.current.children.length > 0) {
      const containerRect = formElementsRef.current.getBoundingClientRect()
      const y = e.clientY - containerRect.top

      let insertIndex = 0
      let closestDistance = Number.POSITIVE_INFINITY

      // Find the closest element to the cursor
      Array.from(formElementsRef.current.children).forEach((child, index) => {
        const childRect = child.getBoundingClientRect()
        const childMiddle = childRect.top + childRect.height / 2 - containerRect.top
        const distance = Math.abs(y - childMiddle)

        if (distance < closestDistance) {
          closestDistance = distance
          insertIndex = y < childMiddle ? index : index + 1
        }
      })

      console.log({ insertIndex })

      setDropIndicatorPosition(insertIndex)
    } else {
      setDropIndicatorPosition(0)
    }
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    // Check if we're leaving the drop area (not just entering a child element)
    const relatedTarget = e.relatedTarget
    if (dropAreaRef.current && !dropAreaRef.current.contains(relatedTarget)) {
      dropAreaRef.current.classList.remove("border-primary", "bg-primary/5")
      setShowDropIndicator(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()

    if (dropAreaRef.current) {
      dropAreaRef.current.classList.remove("border-primary", "bg-primary/5")
    }

    setShowDropIndicator(false)
    setDropTarget(null)

    // Handle element type drop from sidebar
    const elementType = e.dataTransfer.getData("text/plain")
    if (elementType && Object.values(ELEMENT_TYPES).includes(elementType)) {
      const newElement = {
        type: elementType,
        id: `element-${Date.now()}`,
        label: "",
        placeholder: "",
        required: false,
        options:
          elementType === ELEMENT_TYPES.SELECT ||
            elementType === ELEMENT_TYPES.CHECKBOX ||
            elementType === ELEMENT_TYPES.RADIO
            ? ["Option 1", "Option 2", "Option 3"]
            : undefined,
        maxRating: elementType === ELEMENT_TYPES.RATING ? 5 : undefined,
      }

      // Insert at the drop indicator position or append
      if (dropIndicatorPosition !== null && dropIndicatorPosition <= formElements.length) {
        setFormElements((prevElements) => {
          const newElements = [...prevElements]
          newElements.splice(dropIndicatorPosition, 0, newElement)
          return newElements
        })

        // Select the newly added element
        setTimeout(() => {
          setSelectedElement(dropIndicatorPosition)
        }, 50)
      } else {
        setFormElements((prevElements) => [...prevElements, newElement])

        // Select the newly added element
        setTimeout(() => {
          setSelectedElement(formElements.length)
        }, 50)
      }
    }

    // Handle reordering drop
    const reorderData = e.dataTransfer.getData("application/json")
    if (reorderData) {
      try {
        const { index, type } = JSON.parse(reorderData)
        if (type === "reorder" && dropIndicatorPosition !== null) {
          // Don't move if dropping at the same position or right after the dragged element
          if (dropIndicatorPosition !== index && dropIndicatorPosition !== index + 1) {
            const targetIndex = dropIndicatorPosition > index ? dropIndicatorPosition - 1 : dropIndicatorPosition
            moveElement(index, targetIndex)
          }
        }
      } catch (error) {
        console.error("Error parsing reorder data:", error)
      }
    }
  }

  // Handle drag events for form elements
  const handleElementDragStart = (index) => {
    setIsDragging(index)
  }

  const handleElementDragEnd = () => {
    setIsDragging(null)
    setDropTarget(null)
  }

  const handleElementDragOver = (index) => {
    if (isDragging !== null && isDragging !== index) {
      setDropTarget(index)
    }
  }


  const handleElementDrop = (index) => {
    if (isDragging !== null && isDragging !== index) {
      // Don't move if dropping at the same position or right after the dragged element
      if (index !== isDragging && index !== isDragging + 1) {
        const targetIndex = index > isDragging ? index - 1 : index
        console.log({ index, targetIndex })
        moveElement(isDragging, targetIndex)
      }
    }

    setIsDragging(null)
    setDropTarget(null)
  }

  return (
    <div className="flex flex-col md:flex-row h-full">
      <div className="w-full md:w-72 border-r">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full grid grid-cols-2">
            <TabsTrigger value="elements">Elements</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
          </TabsList>
          <TabsContent value="elements" className="p-0 m-0">
            <ScrollArea className="h-[calc(100vh-12rem)]">
              <div className="p-4 grid gap-2">
                {FORM_ELEMENTS.map((element) => (
                  <ElementItem key={element.type} element={element} onAddElement={addNewElement} />
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
          <TabsContent value="templates" className="p-0 m-0">
            <ScrollArea className="h-[calc(100vh-12rem)]">
              <TemplateGallery onSelectTemplate={handleSelectTemplate} />
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </div>
      <div className="flex-1 flex flex-col md:flex-row">
        <div className="flex-1 p-4 flex flex-col items-center overflow-auto">
          <div className={`w-full ${getCanvasWidth()} mx-auto`}>
            <div
              ref={dropAreaRef}
              className="min-h-[80vh] p-4 border-2 rounded-md border-dashed border-muted transition-all duration-200"
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              {formElements.length === 0 ? (
                <div className="text-center p-8">
                  <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Plus className="h-6 w-6 text-primary" />
                  </div>
                  <p className="text-muted-foreground">
                    Drag elements from the sidebar or click to add them to your form
                  </p>
                </div>
              ) : (
                <div ref={formElementsRef} className="space-y-4 relative">
                  {formElements.map((element, index) => (
                    <FormElement
                      key={element.id}
                      element={element}
                      index={index}
                      moveElement={moveElement}
                      isSelected={selectedElement === index}
                      onSelect={handleSelectElement}
                      onRemove={handleRemoveElement}
                      onDragStart={handleElementDragStart}
                      onDragOver={handleElementDragOver}
                      onDragEnd={handleElementDragEnd}
                      onDrop={handleElementDrop}
                      isDragging={isDragging}
                      isDropTarget={dropTarget === index}
                    />
                  ))}

                  {/* Drop indicator */}
                  {showDropIndicator && dropIndicatorPosition !== null && (
                    <div
                      className="absolute left-0 right-0 h-1 bg-primary rounded-full transform transition-all duration-200 z-10"
                      style={{
                        top: dropIndicatorPosition === 0 ? 0 : undefined,
                        bottom: dropIndicatorPosition === formElements.length ? 0 : undefined,
                        top:
                          dropIndicatorPosition > 0 && dropIndicatorPosition < formElements.length
                            ? `${dropIndicatorPosition * 100}%`
                            : undefined,
                      }}
                    />
                  )}
                </div>
              )}
            </div>
            {formElements.length > 0 && (
              <div className="mt-4 flex justify-end">
                <Button className="transition-all duration-200 hover:scale-105">Submit</Button>
              </div>
            )}
          </div>
        </div>
        {selectedElement !== null && (
          <div className="w-full md:w-80 border-t md:border-t-0 md:border-l">
            <ElementProperties element={formElements[selectedElement]} onChange={handleUpdateElement} />
          </div>
        )}
      </div>
    </div>
  )
}

