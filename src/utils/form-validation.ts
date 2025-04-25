import * as z from "zod"

// Base schema for common field properties
const baseFieldSchema = z.object({
  id: z.string(),
  label: z.string().optional(),
  placeholder: z.string().optional(),
  description: z.string().optional(),
  required: z.boolean().optional(),
  width: z.enum(["small", "medium", "full"]).optional(),
  size: z.enum(["small", "medium", "large"]).optional(),
  validationMessage: z.string().optional(),
})

// Text field schema
export const textFieldSchema = baseFieldSchema.extend({
  type: z.literal("text"),
  minLength: z.number().optional(),
  maxLength: z.number().optional(),
})

// Email field schema
export const emailFieldSchema = baseFieldSchema.extend({
  type: z.literal("email"),
})

// Number field schema
export const numberFieldSchema = baseFieldSchema.extend({
  type: z.literal("number"),
  min: z.number().optional(),
  max: z.number().optional(),
})

// Textarea field schema
export const textareaFieldSchema = baseFieldSchema.extend({
  type: z.literal("textarea"),
  minLength: z.number().optional(),
  maxLength: z.number().optional(),
})

// Select field schema
export const selectFieldSchema = baseFieldSchema.extend({
  type: z.literal("select"),
  options: z.array(z.string()),
})

// Checkbox field schema
export const checkboxFieldSchema = baseFieldSchema.extend({
  type: z.literal("checkbox"),
  options: z.array(z.string()),
})

// Radio field schema
export const radioFieldSchema = baseFieldSchema.extend({
  type: z.literal("radio"),
  options: z.array(z.string()),
})

// File field schema
export const fileFieldSchema = baseFieldSchema.extend({
  type: z.literal("file"),
})

// Date field schema
export const dateFieldSchema = baseFieldSchema.extend({
  type: z.literal("date"),
})

// Phone field schema
export const phoneFieldSchema = baseFieldSchema.extend({
  type: z.literal("phone"),
})

// Rating field schema
export const ratingFieldSchema = baseFieldSchema.extend({
  type: z.literal("rating"),
  maxRating: z.number().optional(),
})

// Image field schema
export const imageFieldSchema = baseFieldSchema.extend({
  type: z.literal("image"),
  src: z.string().optional(),
  alt: z.string().optional(),
})

// Union of all field schemas
export const formElementSchema = z.discriminatedUnion("type", [
  textFieldSchema,
  emailFieldSchema,
  numberFieldSchema,
  textareaFieldSchema,
  selectFieldSchema,
  checkboxFieldSchema,
  radioFieldSchema,
  fileFieldSchema,
  dateFieldSchema,
  phoneFieldSchema,
  ratingFieldSchema,
  imageFieldSchema,
])

// Form schema
export const formSchema = z.object({
  title: z.string().min(1, "Form title is required"),
  elements: z.array(formElementSchema),
  settings: z
    .object({
      theme: z.string().optional(),
      primaryColor: z.string().optional(),
      backgroundColor: z.string().optional(),
      borderRadius: z.string().optional(),
      successMessage: z.string().optional(),
      redirectUrl: z.string().optional(),
      enableCaptcha: z.boolean().optional(),
      storeResponses: z.boolean().optional(),
      sendEmailNotifications: z.boolean().optional(),
      emailRecipients: z.string().optional(),
      customCSS: z.string().optional(),
    })
    .optional(),
})

// Generate validation schema for form submission based on form elements
export function generateFormValidationSchema(formElements) {
  const schemaObj = {}

  formElements.forEach((element) => {
    let fieldSchema = z.any()

    switch (element.type) {
      case "text":
        fieldSchema = z.string()
        if (element.required) fieldSchema = fieldSchema.min(1, element.validationMessage || "This field is required")
        if (element.minLength)
          fieldSchema = fieldSchema.min(
            element.minLength,
            element.validationMessage || `Minimum length is ${element.minLength} characters`,
          )
        if (element.maxLength)
          fieldSchema = fieldSchema.max(
            element.maxLength,
            element.validationMessage || `Maximum length is ${element.maxLength} characters`,
          )
        break

      case "email":
        fieldSchema = z.string()
        if (element.required) fieldSchema = fieldSchema.min(1, element.validationMessage || "This field is required")
        fieldSchema = fieldSchema.email(element.validationMessage || "Please enter a valid email address")
        break

      case "number":
        fieldSchema = z.coerce.number()
        if (element.required)
          fieldSchema = fieldSchema
            .optional()
            .refine((val) => val !== undefined, { message: element.validationMessage || "This field is required" })
        if (element.min !== undefined)
          fieldSchema = fieldSchema.min(element.min, element.validationMessage || `Minimum value is ${element.min}`)
        if (element.max !== undefined)
          fieldSchema = fieldSchema.max(element.max, element.validationMessage || `Maximum value is ${element.max}`)
        break

      case "textarea":
        fieldSchema = z.string()
        if (element.required) fieldSchema = fieldSchema.min(1, element.validationMessage || "This field is required")
        if (element.minLength)
          fieldSchema = fieldSchema.min(
            element.minLength,
            element.validationMessage || `Minimum length is ${element.minLength} characters`,
          )
        if (element.maxLength)
          fieldSchema = fieldSchema.max(
            element.maxLength,
            element.validationMessage || `Maximum length is ${element.maxLength} characters`,
          )
        break

      case "select":
        fieldSchema = z.string()
        if (element.required) fieldSchema = fieldSchema.min(1, element.validationMessage || "Please select an option")
        break

      case "checkbox":
        fieldSchema = z.array(z.string())
        if (element.required)
          fieldSchema = fieldSchema.min(1, element.validationMessage || "Please select at least one option")
        break

      case "radio":
        fieldSchema = z.string()
        if (element.required) fieldSchema = fieldSchema.min(1, element.validationMessage || "Please select an option")
        break

      case "date":
        fieldSchema = z.string()
        if (element.required) fieldSchema = fieldSchema.min(1, element.validationMessage || "Please select a date")
        break

      case "phone":
        fieldSchema = z.string()
        if (element.required) fieldSchema = fieldSchema.min(1, element.validationMessage || "This field is required")
        // Add phone number validation pattern if needed
        break

      case "rating":
        fieldSchema = z.number()
        if (element.required) fieldSchema = fieldSchema.min(1, element.validationMessage || "Please provide a rating")
        break

      case "file":
        // File validation is handled separately
        fieldSchema = z.any()
        break

      default:
        fieldSchema = z.any()
    }

    // If not required, make it optional
    if (!element.required && element.type !== "number") {
      fieldSchema = fieldSchema.optional()
    }

    schemaObj[element.id] = fieldSchema
  })

  return z.object(schemaObj)
}

