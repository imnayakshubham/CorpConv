
import { useState, useEffect } from "react"
import { ArrowLeft, Eye, Settings, Smartphone, Tablet, Laptop, Save, Share2, Code, AlertTriangle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FormPreview } from "@/components/form-builder/form-preview"
import { FormSettings } from "@/components/form-builder/form-settings"
import { FormEmbed } from "@/components/form-builder/form-embed"
import { useMediaQuery } from "@/hooks/use-media-query"
import { toast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"
import { FormBuilder } from "@/components/form-builder/form-builder"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { formSchema } from "@/utils/form-validation"
import { Link } from "react-router-dom"

export default function BuilderPage() {
    const [activeTab, setActiveTab] = useState("editor")
    const [formTitle, setFormTitle] = useState("Untitled Form")
    const [formElements, setFormElements] = useState([])
    const [selectedElement, setSelectedElement] = useState(null)
    const [viewMode, setViewMode] = useState("mobile")
    const [isLoading, setIsLoading] = useState(true)
    const [validationErrors, setValidationErrors] = useState([])
    const [formSettings, setFormSettings] = useState({
        theme: "default",
        primaryColor: "#0f172a",
        backgroundColor: "#ffffff",
        borderRadius: "medium",
        successMessage: "Thank you for submitting the form!",
        redirectUrl: "",
        enableCaptcha: true,
        storeResponses: true,
        sendEmailNotifications: false,
        emailRecipients: "",
        customCSS: "",
    })

    const isMobile = useMediaQuery("(max-width: 768px)")

    // Simulate loading state
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false)
        }, 500)
        return () => clearTimeout(timer)
    }, [])

    // Validate form when elements change
    useEffect(() => {
        validateForm()
    }, [formElements, formTitle])

    const validateForm = () => {
        try {
            formSchema.parse({
                title: formTitle,
                elements: formElements,
                settings: formSettings,
            })
            setValidationErrors([])
            return true
        } catch (error) {
            if (error.errors) {
                setValidationErrors(error.errors)
            }
            return false
        }
    }

    const handleSave = () => {
        if (!validateForm()) {
            toast({
                title: "Validation errors",
                description: "Please fix the validation errors before saving.",
                variant: "destructive",
            })
            return
        }

        toast({
            title: "Form saved",
            description: "Your form has been saved successfully.",
            action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
        })
    }

    const handlePublish = () => {
        if (formElements.length === 0) {
            toast({
                title: "Cannot publish empty form",
                description: "Please add at least one element to your form before publishing.",
                variant: "destructive",
            })
            return
        }

        if (!validateForm()) {
            toast({
                title: "Validation errors",
                description: "Please fix the validation errors before publishing.",
                variant: "destructive",
            })
            return
        }

        toast({
            title: "Form published",
            description: "Your form is now live and can be shared with others.",
            action: (
                <ToastAction altText="View" onClick={() => setActiveTab("embed")}>
                    View
                </ToastAction>
            ),
        })
    }

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
            </div>
        )
    }

    return (
        <div className="flex flex-col h-screen bg-background">
            <header className="border-b shadow-sm">
                <div className="container flex h-16 items-center px-4">
                    <Link to="/" className="mr-4 transition-transform hover:scale-110">
                        <ArrowLeft className="h-5 w-5" />
                    </Link>
                    <input
                        type="text"
                        value={formTitle}
                        onChange={(e) => setFormTitle(e.target.value)}
                        className="text-lg font-medium bg-transparent border-none focus:outline-none focus:ring-0 transition-all duration-200 hover:text-primary"
                    />
                    <div className="ml-auto flex items-center gap-2">
                        <div className="hidden md:flex items-center border rounded-md p-1 shadow-sm">
                            <Button
                                variant={viewMode === "mobile" ? "default" : "ghost"}
                                size="sm"
                                onClick={() => setViewMode("mobile")}
                                className="h-8 w-8 p-0 transition-all duration-200"
                            >
                                <Smartphone className="h-4 w-4" />
                            </Button>
                            <Button
                                variant={viewMode === "tablet" ? "default" : "ghost"}
                                size="sm"
                                onClick={() => setViewMode("tablet")}
                                className="h-8 w-8 p-0 transition-all duration-200"
                            >
                                <Tablet className="h-4 w-4" />
                            </Button>
                            <Button
                                variant={viewMode === "desktop" ? "default" : "ghost"}
                                size="sm"
                                onClick={() => setViewMode("desktop")}
                                className="h-8 w-8 p-0 transition-all duration-200"
                            >
                                <Laptop className="h-4 w-4" />
                            </Button>
                        </div>
                        <Button
                            variant="outline"
                            size="sm"
                            className="hidden md:flex transition-all duration-200 hover:border-primary"
                            onClick={handleSave}
                        >
                            <Save className="mr-2 h-4 w-4" />
                            Save
                        </Button>
                        <Button
                            size="sm"
                            className="hidden md:flex transition-all duration-200 hover:bg-primary/90"
                            onClick={handlePublish}
                        >
                            <Share2 className="mr-2 h-4 w-4" />
                            Publish
                        </Button>
                    </div>
                </div>
            </header>

            {validationErrors.length > 0 && (
                <Alert variant="destructive" className="m-4">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Validation Errors</AlertTitle>
                    <AlertDescription>
                        <ul className="list-disc pl-5 mt-2">
                            {validationErrors.map((error, index) => (
                                <li key={index}>{error.message}</li>
                            ))}
                        </ul>
                    </AlertDescription>
                </Alert>
            )}

            <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
                <TabsList className="grid grid-cols-4 w-full rounded-none border-b">
                    <TabsTrigger value="editor" className="data-[state=active]:bg-background transition-all duration-200">
                        Editor
                    </TabsTrigger>
                    <TabsTrigger value="preview" className="data-[state=active]:bg-background transition-all duration-200">
                        <Eye className="mr-2 h-4 w-4" />
                        Preview
                    </TabsTrigger>
                    <TabsTrigger value="settings" className="data-[state=active]:bg-background transition-all duration-200">
                        <Settings className="mr-2 h-4 w-4" />
                        Settings
                    </TabsTrigger>
                    <TabsTrigger value="embed" className="data-[state=active]:bg-background transition-all duration-200">
                        <Code className="mr-2 h-4 w-4" />
                        Embed
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="editor" className="flex-1 p-0 m-0 animate-in fade-in-50 duration-300">
                    <FormBuilder
                        formElements={formElements}
                        setFormElements={setFormElements}
                        selectedElement={selectedElement}
                        setSelectedElement={setSelectedElement}
                        viewMode={viewMode}
                        setFormTitle={setFormTitle}
                    />
                </TabsContent>
                <TabsContent value="preview" className="flex-1 p-0 m-0 animate-in fade-in-50 duration-300">
                    <FormPreview
                        formTitle={formTitle}
                        formElements={formElements}
                        viewMode={viewMode}
                        formSettings={formSettings}
                    />
                </TabsContent>
                <TabsContent value="settings" className="flex-1 p-0 m-0 animate-in fade-in-50 duration-300">
                    <FormSettings
                        formElements={formElements}
                        setFormElements={setFormElements}
                        formSettings={formSettings}
                        setFormSettings={setFormSettings}
                    />
                </TabsContent>
                <TabsContent value="embed" className="flex-1 p-0 m-0 animate-in fade-in-50 duration-300">
                    <FormEmbed
                        formTitle={formTitle}
                        formId={`form-${Date.now().toString(36)}`} // Generate a unique ID
                    />
                </TabsContent>
            </Tabs>
            <div className="md:hidden fixed bottom-0 left-0 right-0 border-t bg-background p-2 flex justify-between shadow-lg">
                <Button variant="outline" size="sm" onClick={handleSave} className="transition-transform hover:scale-105">
                    <Save className="h-4 w-4" />
                </Button>
                <Button size="sm" onClick={handlePublish} className="transition-transform hover:scale-105">
                    <Share2 className="h-4 w-4" />
                </Button>
            </div>
        </div>
    )
}

