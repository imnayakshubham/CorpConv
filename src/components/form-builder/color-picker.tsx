"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

export function ColorPicker({ color, onChange }) {
  const [currentColor, setCurrentColor] = useState(color)

  const handleColorChange = (e) => {
    setCurrentColor(e.target.value)
    onChange(e.target.value)
  }

  return (
    <div className="flex items-center gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <div className="w-10 h-10 rounded-md border cursor-pointer" style={{ backgroundColor: currentColor }} />
        </PopoverTrigger>
        <PopoverContent className="w-auto p-3">
          <input type="color" value={currentColor} onChange={handleColorChange} className="w-32 h-32 cursor-pointer" />
        </PopoverContent>
      </Popover>
      <Input type="text" value={currentColor} onChange={handleColorChange} className="font-mono" />
    </div>
  )
}

