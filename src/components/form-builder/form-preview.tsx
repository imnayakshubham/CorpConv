import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { toast } from "@/components/ui/use-toast"
import { CheckCircle2, AlertCircle, Heart } from "lucide-react"
import { generateFormValidationSchema } from "@/utils/form-validation"
import { cn } from "@/utils/utils"

export function FormPreview({ formTitle, formElements, viewMode, formSettings }) {
  const [submitted, setSubmitted] = useState(false)

  // Generate validation schema based on form elements
  const validationSchema = generateFormValidationSchema(formElements)

  // Initialize React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(validationSchema),
    mode: formSettings?.validationTiming || "onBlur",
  })

  const getPreviewWidth = () => {
    switch (viewMode) {
      case "mobile":
        return "max-w-sm"
      case "tablet":
        return "max-w-md"
      case "desktop":
        return "max-w-2xl"
      default:
        return "max-w-sm"
    }
  }

  const getBorderRadiusValue = (size) => {
    switch (size) {
      case "small":
        return "0.25rem"
      case "large":
        return "0.75rem"
      default:
        return "0.5rem" // medium
    }
  }

  const getFormStyle = () => {
    return {
      backgroundColor: formSettings?.backgroundColor || "#ffffff",
      borderRadius: getBorderRadiusValue(formSettings?.borderRadius || "medium"),
      fontFamily: formSettings?.fontFamily || "Inter, sans-serif",
      boxShadow: formSettings?.enableShadow ? "0 4px 12px rgba(0, 0, 0, 0.1)" : "none",
    }
  }

  const getButtonStyle = () => {
    if (formSettings?.buttonStyle === "outline") {
      return {
        backgroundColor: "transparent",
        borderColor: formSettings?.primaryColor || "#0f172a",
        color: formSettings?.primaryColor || "#0f172a",
        borderWidth: "2px",
        borderRadius: getBorderRadiusValue(formSettings?.borderRadius || "medium"),
      }
    }

    return {
      backgroundColor: formSettings?.primaryColor || "#0f172a",
      color: "#ffffff",
      borderRadius: getBorderRadiusValue(formSettings?.borderRadius || "medium"),
    }
  }

  const onSubmit = async (data) => {
    // Simulate form submission with a delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Show success message
    setSubmitted(true)
    toast({
      title: "Form submitted",
      description: "Your form has been submitted successfully.",
    })
  }

  const renderElement = (element) => {
    const hasError = errors[element.id]
    const errorMessage = hasError?.message
    const errorClass = hasError ? "border-red-500 focus:ring-red-500" : ""
    const showRequiredAsterisk = formSettings?.showRequiredAsterisk !== false

    switch (element.type) {
      case "text":
        return (
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center justify-between">
              <span>
                {element.label || "Text Field"}
                {showRequiredAsterisk && element.required && <span className="text-red-500 ml-1">*</span>}
              </span>
              {hasError && (
                <span className="text-xs text-red-500 flex items-center">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  {errorMessage}
                </span>
              )}
            </label>
            {element.description && <p className="text-xs text-muted-foreground">{element.description}</p>}
            <input
              type="text"
              placeholder={element.placeholder || "Enter text"}
              className={cn(
                "w-full p-2 border rounded-md transition-all duration-200 focus:ring-2 focus:ring-primary/20 focus:border-primary",
                errorClass,
              )}
              style={{ borderRadius: getBorderRadiusValue(formSettings?.borderRadius || "medium") }}
              {...register(element.id)}
            />
          </div>
        )
      case "textarea":
        return (
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center justify-between">
              <span>
                {element.label || "Paragraph Field"}
                {showRequiredAsterisk && element.required && <span className="text-red-500 ml-1">*</span>}
              </span>
              {hasError && (
                <span className="text-xs text-red-500 flex items-center">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  {errorMessage}
                </span>
              )}
            </label>
            {element.description && <p className="text-xs text-muted-foreground">{element.description}</p>}
            <textarea
              placeholder={element.placeholder || "Enter text"}
              className={cn(
                "w-full p-2 border rounded-md transition-all duration-200 focus:ring-2 focus:ring-primary/20 focus:border-primary",
                errorClass,
              )}
              style={{ borderRadius: getBorderRadiusValue(formSettings?.borderRadius || "medium") }}
              rows={3}
              {...register(element.id)}
            />
          </div>
        )
      case "email":
        return (
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center justify-between">
              <span>
                {element.label || "Email Field"}
                {showRequiredAsterisk && element.required && <span className="text-red-500 ml-1">*</span>}
              </span>
              {hasError && (
                <span className="text-xs text-red-500 flex items-center">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  {errorMessage}
                </span>
              )}
            </label>
            {element.description && <p className="text-xs text-muted-foreground">{element.description}</p>}
            <input
              type="email"
              placeholder={element.placeholder || "Enter email"}
              className={cn(
                "w-full p-2 border rounded-md transition-all duration-200 focus:ring-2 focus:ring-primary/20 focus:border-primary",
                errorClass,
              )}
              style={{ borderRadius: getBorderRadiusValue(formSettings?.borderRadius || "medium") }}
              {...register(element.id)}
            />
          </div>
        )
      case "phone":
        return (
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center justify-between">
              <span>
                {element.label || "Phone Field"}
                {showRequiredAsterisk && element.required && <span className="text-red-500 ml-1">*</span>}
              </span>
              {hasError && (
                <span className="text-xs text-red-500 flex items-center">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  {errorMessage}
                </span>
              )}
            </label>
            {element.description && <p className="text-xs text-muted-foreground">{element.description}</p>}
            <input
              type="tel"
              placeholder={element.placeholder || "Enter phone number"}
              className={cn(
                "w-full p-2 border rounded-md transition-all duration-200 focus:ring-2 focus:ring-primary/20 focus:border-primary",
                errorClass,
              )}
              style={{ borderRadius: getBorderRadiusValue(formSettings?.borderRadius || "medium") }}
              {...register(element.id)}
            />
          </div>
        )
      case "number":
        return (
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center justify-between">
              <span>
                {element.label || "Number Field"}
                {showRequiredAsterisk && element.required && <span className="text-red-500 ml-1">*</span>}
              </span>
              {hasError && (
                <span className="text-xs text-red-500 flex items-center">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  {errorMessage}
                </span>
              )}
            </label>
            {element.description && <p className="text-xs text-muted-foreground">{element.description}</p>}
            <input
              type="number"
              placeholder={element.placeholder || "Enter number"}
              className={cn(
                "w-full p-2 border rounded-md transition-all duration-200 focus:ring-2 focus:ring-primary/20 focus:border-primary",
                errorClass,
              )}
              style={{ borderRadius: getBorderRadiusValue(formSettings?.borderRadius || "medium") }}
              min={element.min}
              max={element.max}
              {...register(element.id)}
            />
          </div>
        )
      case "select":
        return (
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center justify-between">
              <span>
                {element.label || "Dropdown Field"}
                {showRequiredAsterisk && element.required && <span className="text-red-500 ml-1">*</span>}
              </span>
              {hasError && (
                <span className="text-xs text-red-500 flex items-center">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  {errorMessage}
                </span>
              )}
            </label>
            {element.description && <p className="text-xs text-muted-foreground">{element.description}</p>}
            <select
              className={cn(
                "w-full p-2 border rounded-md transition-all duration-200 focus:ring-2 focus:ring-primary/20 focus:border-primary",
                errorClass,
              )}
              style={{ borderRadius: getBorderRadiusValue(formSettings?.borderRadius || "medium") }}
              {...register(element.id)}
            >
              <option value="" disabled>
                {element.placeholder || "Select an option"}
              </option>
              {(element.options || ["Option 1", "Option 2", "Option 3"]).map((option, i) => (
                <option key={i} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        )
      case "checkbox":
        return (
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center justify-between">
              <span>
                {element.label || "Checkbox Field"}
                {showRequiredAsterisk && element.required && <span className="text-red-500 ml-1">*</span>}
              </span>
              {hasError && (
                <span className="text-xs text-red-500 flex items-center">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  {errorMessage}
                </span>
              )}
            </label>
            {element.description && <p className="text-xs text-muted-foreground">{element.description}</p>}
            <div className={cn("space-y-1", hasError && "border border-red-500 p-2 rounded-md")}>
              {(element.options || ["Option 1", "Option 2", "Option 3"]).map((option, i) => (
                <div key={i} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id={`checkbox-preview-${element.id}-${i}`}
                    value={option}
                    className="rounded text-primary focus:ring-primary"
                    {...register(element.id)}
                  />
                  <label htmlFor={`checkbox-preview-${element.id}-${i}`} className="text-sm">
                    {option}
                  </label>
                </div>
              ))}
            </div>
          </div>
        )
      case "radio":
        return (
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center justify-between">
              <span>
                {element.label || "Radio Field"}
                {showRequiredAsterisk && element.required && <span className="text-red-500 ml-1">*</span>}
              </span>
              {hasError && (
                <span className="text-xs text-red-500 flex items-center">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  {errorMessage}
                </span>
              )}
            </label>
            {element.description && <p className="text-xs text-muted-foreground">{element.description}</p>}
            <div className={cn("space-y-1", hasError && "border border-red-500 p-2 rounded-md")}>
              {(element.options || ["Option 1", "Option 2", "Option 3"]).map((option, i) => (
                <div key={i} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name={element.id}
                    id={`radio-preview-${element.id}-${i}`}
                    value={option}
                    className="text-primary focus:ring-primary"
                    {...register(element.id)}
                  />
                  <label htmlFor={`radio-preview-${element.id}-${i}`} className="text-sm">
                    {option}
                  </label>
                </div>
              ))}
            </div>
          </div>
        )
      case "file":
        return (
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center justify-between">
              <span>
                {element.label || "File Upload"}
                {showRequiredAsterisk && element.required && <span className="text-red-500 ml-1">*</span>}
              </span>
              {hasError && (
                <span className="text-xs text-red-500 flex items-center">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  {errorMessage}
                </span>
              )}
            </label>
            {element.description && <p className="text-xs text-muted-foreground">{element.description}</p>}
            <input
              type="file"
              className={cn(
                "w-full p-2 border rounded-md transition-all duration-200 focus:ring-2 focus:ring-primary/20 focus:border-primary",
                errorClass,
              )}
              style={{ borderRadius: getBorderRadiusValue(formSettings?.borderRadius || "medium") }}
              {...register(element.id)}
            />
          </div>
        )
      case "date":
        return (
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center justify-between">
              <span>
                {element.label || "Date Field"}
                {showRequiredAsterisk && element.required && <span className="text-red-500 ml-1">*</span>}
              </span>
              {hasError && (
                <span className="text-xs text-red-500 flex items-center">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  {errorMessage}
                </span>
              )}
            </label>
            {element.description && <p className="text-xs text-muted-foreground">{element.description}</p>}
            <input
              type="date"
              className={cn(
                "w-full p-2 border rounded-md transition-all duration-200 focus:ring-2 focus:ring-primary/20 focus:border-primary",
                errorClass,
              )}
              style={{ borderRadius: getBorderRadiusValue(formSettings?.borderRadius || "medium") }}
              {...register(element.id)}
            />
          </div>
        )
      case "rating":
        return (
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center justify-between">
              <span>
                {element.label || "Rating"}
                {showRequiredAsterisk && element.required && <span className="text-red-500 ml-1">*</span>}
              </span>
              {hasError && (
                <span className="text-xs text-red-500 flex items-center">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  {errorMessage}
                </span>
              )}
            </label>
            {element.description && <p className="text-xs text-muted-foreground">{element.description}</p>}
            <div className={cn("flex gap-1", hasError && "border border-red-500 p-2 rounded-md")}>
              {Array.from({ length: element.maxRating || 5 }).map((_, i) => {
                const ratingValue = i + 1
                const isSelected = watch(element.id) >= ratingValue

                return (
                  <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill={isSelected ? "currentColor" : "none"}
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={cn(
                      "h-6 w-6 cursor-pointer transition-all duration-200",
                      isSelected ? "fill-primary stroke-primary" : "stroke-muted-foreground hover:stroke-primary",
                    )}
                    onClick={() => setValue(element.id, ratingValue, { shouldValidate: true })}
                    style={isSelected ? { fill: formSettings?.primaryColor, stroke: formSettings?.primaryColor } : {}}
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                )
              })}
              <input type="hidden" {...register(element.id)} />
            </div>
          </div>
        )
      case "image":
        return (
          <div className="space-y-2">
            <label className="text-sm font-medium">{element.label || "Image"}</label>
            {element.description && <p className="text-xs text-muted-foreground">{element.description}</p>}
            <div
              className="border rounded-md p-4 flex items-center justify-center"
              style={{ borderRadius: getBorderRadiusValue(formSettings?.borderRadius || "medium") }}
            >
              <img
                src={element.src || "/placeholder.svg?height=200&width=300"}
                alt={element.alt || "Image"}
                className="max-h-40 object-contain"
              />
            </div>
          </div>
        )
      default:
        return <div>Unknown element type</div>
    }
  }

  return (
    <ScrollArea className="h-[calc(100vh-12rem)]">
      <div className="p-4 flex flex-col items-center">
        <div className={`w-full ${getPreviewWidth()} mx-auto p-6 rounded-lg border`} style={getFormStyle()}>
          {formSettings?.showBranding === true && formSettings?.brandingPosition === "top" && (
            <div className="mb-4 text-center text-xs text-muted-foreground flex items-center justify-center">
              Powered by Hushwork <Heart className="h-3 w-3 mx-1 text-red-500 fill-red-500" />
            </div>
          )}

          {submitted ? (
            <div className="py-12 text-center">
              <div className="mx-auto w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <CheckCircle2 className="h-6 w-6 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Thank You!</h2>
              <p className="text-muted-foreground">
                {formSettings?.successMessage || "Your form has been submitted successfully."}
              </p>
              <Button
                className="mt-6"
                variant="outline"
                onClick={() => {
                  setSubmitted(false)
                  reset()
                }}
                style={{ borderRadius: getBorderRadiusValue(formSettings?.borderRadius || "medium") }}
              >
                Submit Another Response
              </Button>
            </div>
          ) : (
            <>
              <div className="mb-6 pb-4 border-b">
                <h2 className="text-2xl font-bold" style={{ color: formSettings?.primaryColor }}>
                  {formTitle}
                </h2>
                {formElements.length > 0 && (
                  <p className="text-muted-foreground mt-2">Complete the form below to submit your response.</p>
                )}
              </div>

              <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                {formElements.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <p>This form has no elements yet. Add some in the Editor tab.</p>
                  </div>
                ) : (
                  formElements.map((element, index) => (
                    <div
                      key={element.id}
                      className="transition-all duration-200 hover:bg-muted/20 -mx-2 p-2 rounded-md"
                    >
                      {renderElement(element)}
                    </div>
                  ))
                )}
                {formElements.length > 0 && (
                  <div className="pt-4 flex justify-end">
                    <Button
                      type="submit"
                      size="lg"
                      className="px-8 transition-all duration-200 hover:scale-105"
                      disabled={isSubmitting}
                      style={getButtonStyle()}
                    >
                      {isSubmitting ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Submitting...
                        </>
                      ) : (
                        formSettings?.submitButtonText || "Submit"
                      )}
                    </Button>
                  </div>
                )}
              </form>
            </>
          )}

          {formSettings?.showBranding !== false && formSettings?.brandingPosition !== "top" && (
            <div className="mt-6 text-center text-xs text-muted-foreground flex items-center justify-center">
              Powered by Hushwork <Heart className="h-3 w-3 mx-1 text-red-500 fill-red-500" />
            </div>
          )}
        </div>
      </div>
    </ScrollArea>
  )
}

