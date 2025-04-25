"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Trash2, X } from "lucide-react"
import { useMediaQuery } from "@/hooks/use-media-query"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerClose } from "@/components/ui/drawer"

export function ElementProperties({ element, onChange, isDrawerOpen, setIsDrawerOpen }) {
  const isMobile = useMediaQuery("(max-width: 768px)")

  if (!element) return null

  const handleOptionChange = (index, value) => {
    if (!element.options) return

    const newOptions = [...element.options]
    newOptions[index] = value
    onChange({ options: newOptions })
  }

  const handleAddOption = () => {
    if (!element.options) return

    onChange({ options: [...element.options, `Option ${element.options.length + 1}`] })
  }

  const handleRemoveOption = (index) => {
    if (!element.options) return

    const newOptions = [...element.options]
    newOptions.splice(index, 1)
    onChange({ options: newOptions })
  }

  const renderContent = () => (
    <div className="p-4">
      <h3 className="font-semibold mb-4">Element Properties</h3>
      <Tabs defaultValue="basic">
        <TabsList className="w-full grid grid-cols-3">
          <TabsTrigger value="basic">Basic</TabsTrigger>
          <TabsTrigger value="validation">Validation</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
        </TabsList>
        <TabsContent value="basic" className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="label">Label</Label>
            <Input
              id="label"
              value={element.label || ""}
              onChange={(e) => onChange({ label: e.target.value })}
              placeholder="Enter label"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="placeholder">Placeholder</Label>
            <Input
              id="placeholder"
              value={element.placeholder || ""}
              onChange={(e) => onChange({ placeholder: e.target.value })}
              placeholder="Enter placeholder"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Help Text</Label>
            <Textarea
              id="description"
              value={element.description || ""}
              onChange={(e) => onChange({ description: e.target.value })}
              placeholder="Enter help text"
            />
          </div>
          {(element.type === "select" || element.type === "checkbox" || element.type === "radio") && (
            <div className="space-y-2">
              <Label>Options</Label>
              <div className="space-y-2">
                {element.options?.map((option, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input
                      value={option}
                      onChange={(e) => handleOptionChange(index, e.target.value)}
                      placeholder={`Option ${index + 1}`}
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveOption(index)}
                      disabled={element.options.length <= 1}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button variant="outline" size="sm" className="w-full" onClick={handleAddOption}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Option
                </Button>
              </div>
            </div>
          )}
          {element.type === "rating" && (
            <div className="space-y-2">
              <Label htmlFor="maxRating">Max Rating</Label>
              <Input
                id="maxRating"
                type="number"
                min="1"
                max="10"
                value={element.maxRating || 5}
                onChange={(e) => onChange({ maxRating: Number.parseInt(e.target.value) })}
              />
            </div>
          )}
        </TabsContent>
        <TabsContent value="validation" className="space-y-4 pt-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="required">Required</Label>
            <Switch
              id="required"
              checked={element.required || false}
              onCheckedChange={(checked) => onChange({ required: checked })}
            />
          </div>
          {(element.type === "text" || element.type === "textarea") && (
            <>
              <div className="space-y-2">
                <Label htmlFor="minLength">Min Length</Label>
                <Input
                  id="minLength"
                  type="number"
                  min="0"
                  value={element.minLength || ""}
                  onChange={(e) => onChange({ minLength: e.target.value ? Number.parseInt(e.target.value) : "" })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="maxLength">Max Length</Label>
                <Input
                  id="maxLength"
                  type="number"
                  min="0"
                  value={element.maxLength || ""}
                  onChange={(e) => onChange({ maxLength: e.target.value ? Number.parseInt(e.target.value) : "" })}
                />
              </div>
            </>
          )}
          {element.type === "number" && (
            <>
              <div className="space-y-2">
                <Label htmlFor="min">Min Value</Label>
                <Input
                  id="min"
                  type="number"
                  value={element.min || ""}
                  onChange={(e) => onChange({ min: e.target.value ? Number.parseInt(e.target.value) : "" })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="max">Max Value</Label>
                <Input
                  id="max"
                  type="number"
                  value={element.max || ""}
                  onChange={(e) => onChange({ max: e.target.value ? Number.parseInt(e.target.value) : "" })}
                />
              </div>
            </>
          )}
          <div className="space-y-2">
            <Label htmlFor="validationMessage">Custom Validation Message</Label>
            <Textarea
              id="validationMessage"
              value={element.validationMessage || ""}
              onChange={(e) => onChange({ validationMessage: e.target.value })}
              placeholder="Enter custom validation message"
            />
          </div>
        </TabsContent>
        <TabsContent value="appearance" className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="width">Width</Label>
            <div className="grid grid-cols-3 gap-2">
              <Button
                variant={element.width === "small" ? "default" : "outline"}
                onClick={() => onChange({ width: "small" })}
              >
                Small
              </Button>
              <Button
                variant={element.width === "medium" || !element.width ? "default" : "outline"}
                onClick={() => onChange({ width: "medium" })}
              >
                Medium
              </Button>
              <Button
                variant={element.width === "full" ? "default" : "outline"}
                onClick={() => onChange({ width: "full" })}
              >
                Full
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="size">Size</Label>
            <div className="grid grid-cols-3 gap-2">
              <Button
                variant={element.size === "small" ? "default" : "outline"}
                onClick={() => onChange({ size: "small" })}
              >
                Small
              </Button>
              <Button
                variant={element.size === "medium" || !element.size ? "default" : "outline"}
                onClick={() => onChange({ size: "medium" })}
              >
                Medium
              </Button>
              <Button
                variant={element.size === "large" ? "default" : "outline"}
                onClick={() => onChange({ size: "large" })}
              >
                Large
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )

  if (isMobile) {
    return (
      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerContent className="h-[85vh]">
          <DrawerHeader className="border-b">
            <DrawerTitle>Element Properties</DrawerTitle>
            <DrawerClose className="absolute right-4 top-4">
              <X className="h-4 w-4" />
            </DrawerClose>
          </DrawerHeader>
          <ScrollArea className="h-full">{renderContent()}</ScrollArea>
        </DrawerContent>
      </Drawer>
    )
  }

  return <ScrollArea className="h-[calc(100vh-12rem)]">{renderContent()}</ScrollArea>
}

