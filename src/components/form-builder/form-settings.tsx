"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { ColorPicker } from "@/components/form-builder/color-picker"
import { toast } from "@/components/ui/use-toast"
import { useState, useEffect } from "react"
import { AlertCircle, Info, Save } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/utils/utils"

export function FormSettings({ formElements, setFormElements, formSettings, setFormSettings }) {
  const [activeTab, setActiveTab] = useState("design")
  const [emailError, setEmailError] = useState("")
  const [previewStyle, setPreviewStyle] = useState({})

  // Update preview style when settings change
  useEffect(() => {
    setPreviewStyle({
      backgroundColor: formSettings.backgroundColor,
      borderRadius: getBorderRadiusValue(formSettings.borderRadius),
      fontFamily: formSettings.fontFamily || "Inter, sans-serif",
      boxShadow: formSettings.enableShadow ? "0 4px 12px rgba(0, 0, 0, 0.1)" : "none",
    })
  }, [formSettings])

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

  const handleSettingChange = (key, value) => {
    setFormSettings({
      ...formSettings,
      [key]: value,
    })

    // Show toast for immediate feedback
    toast({
      title: "Setting updated",
      description: `The ${key} setting has been updated.`,
      duration: 1500,
    })
  }

  const validateEmails = (emails) => {
    if (!emails) return true

    const emailList = emails.split(",").map((email) => email.trim())
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    for (const email of emailList) {
      if (!emailRegex.test(email)) {
        return false
      }
    }

    return true
  }

  const handleEmailRecipientsChange = (e) => {
    const value = e.target.value
    handleSettingChange("emailRecipients", value)

    if (!validateEmails(value)) {
      setEmailError("Please enter valid email addresses separated by commas")
    } else {
      setEmailError("")
    }
  }

  const applyTheme = (theme) => {
    let themeSettings = {}

    switch (theme) {
      case "minimal":
        themeSettings = {
          primaryColor: "#0f172a",
          backgroundColor: "#ffffff",
          borderRadius: "small",
          enableShadow: false,
          fontFamily: "inter",
        }
        break
      case "bold":
        themeSettings = {
          primaryColor: "#3b82f6",
          backgroundColor: "#f8fafc",
          borderRadius: "large",
          enableShadow: true,
          fontFamily: "poppins",
        }
        break
      case "rounded":
        themeSettings = {
          primaryColor: "#8b5cf6",
          backgroundColor: "#ffffff",
          borderRadius: "large",
          enableShadow: false,
          fontFamily: "roboto",
        }
        break
      case "shadow":
        themeSettings = {
          primaryColor: "#6366f1",
          backgroundColor: "#f9fafb",
          borderRadius: "medium",
          enableShadow: true,
          fontFamily: "inter",
        }
        break
      case "gradient":
        themeSettings = {
          primaryColor: "#ec4899",
          backgroundColor: "#f5f3ff",
          borderRadius: "medium",
          enableShadow: true,
          fontFamily: "montserrat",
        }
        break
      default: // default theme
        themeSettings = {
          primaryColor: "#0f172a",
          backgroundColor: "#ffffff",
          borderRadius: "medium",
          enableShadow: false,
          fontFamily: "inter",
        }
    }

    setFormSettings({
      ...formSettings,
      theme,
      ...themeSettings,
    })

    toast({
      title: "Theme applied",
      description: `The ${theme} theme has been applied to your form.`,
    })
  }

  const saveSettings = () => {
    toast({
      title: "Settings saved",
      description: "Your form settings have been saved successfully.",
      action: (
        <Button variant="outline" size="sm">
          Undo
        </Button>
      ),
    })
  }

  return (
    <ScrollArea className="h-[calc(100vh-12rem)]">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Form Settings</h2>
          <Button onClick={saveSettings} size="sm">
            <Save className="h-4 w-4 mr-2" />
            Save Settings
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full grid grid-cols-2">
            <TabsTrigger value="design">Design</TabsTrigger>
            <TabsTrigger value="behavior">Behavior</TabsTrigger>
          </TabsList>

          <TabsContent value="design" className="space-y-6 pt-4">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-semibold">Theme</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <Card
                      className={cn(
                        "cursor-pointer transition-all duration-200 hover:shadow-md",
                        formSettings.theme === "default" ? "ring-2 ring-primary" : "",
                      )}
                      onClick={() => applyTheme("default")}
                    >
                      <CardContent className="p-4 flex items-center justify-center h-24">
                        <div className="text-center">
                          <div className="font-medium">Default</div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card
                      className={cn(
                        "cursor-pointer transition-all duration-200 hover:shadow-md",
                        formSettings.theme === "minimal" ? "ring-2 ring-primary" : "",
                      )}
                      onClick={() => applyTheme("minimal")}
                    >
                      <CardContent className="p-4 flex items-center justify-center h-24">
                        <div className="text-center">
                          <div className="font-medium">Minimal</div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card
                      className={cn(
                        "cursor-pointer transition-all duration-200 hover:shadow-md",
                        formSettings.theme === "bold" ? "ring-2 ring-primary" : "",
                      )}
                      onClick={() => applyTheme("bold")}
                    >
                      <CardContent className="p-4 flex items-center justify-center h-24">
                        <div className="text-center">
                          <div className="font-medium">Bold</div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card
                      className={cn(
                        "cursor-pointer transition-all duration-200 hover:shadow-md",
                        formSettings.theme === "rounded" ? "ring-2 ring-primary" : "",
                      )}
                      onClick={() => applyTheme("rounded")}
                    >
                      <CardContent className="p-4 flex items-center justify-center h-24">
                        <div className="text-center">
                          <div className="font-medium">Rounded</div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card
                      className={cn(
                        "cursor-pointer transition-all duration-200 hover:shadow-md",
                        formSettings.theme === "shadow" ? "ring-2 ring-primary" : "",
                      )}
                      onClick={() => applyTheme("shadow")}
                    >
                      <CardContent className="p-4 flex items-center justify-center h-24">
                        <div className="text-center">
                          <div className="font-medium">Shadow</div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card
                      className={cn(
                        "cursor-pointer transition-all duration-200 hover:shadow-md",
                        formSettings.theme === "gradient" ? "ring-2 ring-primary" : "",
                      )}
                      onClick={() => applyTheme("gradient")}
                    >
                      <CardContent className="p-4 flex items-center justify-center h-24">
                        <div className="text-center">
                          <div className="font-medium">Gradient</div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold">Colors</h3>
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <Label>Primary Color</Label>
                      <ColorPicker
                        color={formSettings.primaryColor}
                        onChange={(color) => handleSettingChange("primaryColor", color)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Background Color</Label>
                      <ColorPicker
                        color={formSettings.backgroundColor}
                        onChange={(color) => handleSettingChange("backgroundColor", color)}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold">Typography</h3>
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="font-family">Font Family</Label>
                      <Select
                        defaultValue={formSettings.fontFamily || "inter"}
                        onValueChange={(value) => handleSettingChange("fontFamily", value)}
                      >
                        <SelectTrigger id="font-family">
                          <SelectValue placeholder="Select font" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="inter">Inter</SelectItem>
                          <SelectItem value="roboto">Roboto</SelectItem>
                          <SelectItem value="poppins">Poppins</SelectItem>
                          <SelectItem value="opensans">Open Sans</SelectItem>
                          <SelectItem value="montserrat">Montserrat</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold">Appearance</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Border Radius</Label>
                      <div className="grid grid-cols-3 gap-2">
                        <Button
                          variant={formSettings.borderRadius === "small" ? "default" : "outline"}
                          onClick={() => handleSettingChange("borderRadius", "small")}
                        >
                          Small
                        </Button>
                        <Button
                          variant={
                            formSettings.borderRadius === "medium" || !formSettings.borderRadius ? "default" : "outline"
                          }
                          onClick={() => handleSettingChange("borderRadius", "medium")}
                        >
                          Medium
                        </Button>
                        <Button
                          variant={formSettings.borderRadius === "large" ? "default" : "outline"}
                          onClick={() => handleSettingChange("borderRadius", "large")}
                        >
                          Large
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="enable-shadow">Enable Shadow</Label>
                      <Switch
                        id="enable-shadow"
                        checked={formSettings.enableShadow || false}
                        onCheckedChange={(checked) => handleSettingChange("enableShadow", checked)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Button Style</Label>
                      <div className="grid grid-cols-2 gap-2">
                        <Button
                          variant={
                            formSettings.buttonStyle === "filled" || !formSettings.buttonStyle ? "default" : "outline"
                          }
                          onClick={() => handleSettingChange("buttonStyle", "filled")}
                        >
                          Filled
                        </Button>
                        <Button
                          variant={formSettings.buttonStyle === "outline" ? "default" : "outline"}
                          onClick={() => handleSettingChange("buttonStyle", "outline")}
                        >
                          Outline
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold">Advanced</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="custom-css">Custom CSS</Label>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="h-4 w-4 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="max-w-xs">Add custom CSS to further customize your form's appearance</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <Textarea
                      id="custom-css"
                      value={formSettings.customCSS}
                      onChange={(e) => handleSettingChange("customCSS", e.target.value)}
                      placeholder=".form-container { /* your styles */ }"
                      className="font-mono"
                      rows={6}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold">Preview</h3>
                <div className="border rounded-md p-4 h-[500px] overflow-auto">
                  <div className="flex justify-center">
                    <div className="w-full max-w-md border p-6 transition-all duration-300" style={previewStyle}>
                      <h3 className="text-xl font-bold mb-4" style={{ color: formSettings.primaryColor }}>
                        Sample Form
                      </h3>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Full Name</label>
                          <input
                            type="text"
                            className="w-full p-2 border rounded-md"
                            placeholder="Enter your name"
                            style={{ borderRadius: getBorderRadiusValue(formSettings.borderRadius) }}
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Email Address</label>
                          <input
                            type="email"
                            className="w-full p-2 border rounded-md"
                            placeholder="your.email@example.com"
                            style={{ borderRadius: getBorderRadiusValue(formSettings.borderRadius) }}
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Message</label>
                          <textarea
                            className="w-full p-2 border rounded-md"
                            rows={3}
                            placeholder="Type your message here..."
                            style={{ borderRadius: getBorderRadiusValue(formSettings.borderRadius) }}
                          ></textarea>
                        </div>
                        <div className="pt-2">
                          <Button
                            className={
                              formSettings.buttonStyle === "outline"
                                ? "border-2 bg-transparent hover:bg-primary/10"
                                : ""
                            }
                            style={{
                              backgroundColor:
                                formSettings.buttonStyle === "outline" ? "transparent" : formSettings.primaryColor,
                              borderColor: formSettings.primaryColor,
                              color: formSettings.buttonStyle === "outline" ? formSettings.primaryColor : "white",
                              borderRadius: getBorderRadiusValue(formSettings.borderRadius),
                            }}
                          >
                            Submit
                          </Button>
                        </div>
                      </div>
                      <div className="mt-6 text-center text-xs text-muted-foreground">Powered by Hushwork ❤️</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="behavior" className="space-y-6 pt-4">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <div className="space-y-4">
                  <h3 className="font-semibold">Form Submission</h3>
                  <div className="space-y-2">
                    <Label htmlFor="success-message">Success Message</Label>
                    <Textarea
                      id="success-message"
                      value={formSettings.successMessage}
                      onChange={(e) => handleSettingChange("successMessage", e.target.value)}
                      placeholder="Thank you for submitting the form!"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="redirect-url">Redirect URL (Optional)</Label>
                    <Input
                      id="redirect-url"
                      value={formSettings.redirectUrl}
                      onChange={(e) => handleSettingChange("redirectUrl", e.target.value)}
                      placeholder="https://example.com/thank-you"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Label htmlFor="enable-captcha">Enable CAPTCHA</Label>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="h-4 w-4 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Protect your form from spam and bots</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <Switch
                      id="enable-captcha"
                      checked={formSettings.enableCaptcha}
                      onCheckedChange={(checked) => handleSettingChange("enableCaptcha", checked)}
                    />
                  </div>
                </div>

                <div className="space-y-4 mt-6">
                  <h3 className="font-semibold">Data Storage</h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Label htmlFor="store-responses">Store Form Responses</Label>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="h-4 w-4 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Save responses to your Hushwork dashboard</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <Switch
                      id="store-responses"
                      checked={formSettings.storeResponses}
                      onCheckedChange={(checked) => handleSettingChange("storeResponses", checked)}
                    />
                  </div>

                  {formSettings.storeResponses && (
                    <div className="space-y-2 pl-6 border-l-2 border-muted mt-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="response-expiry">Response Expiry</Label>
                        <Select
                          defaultValue={formSettings.responseExpiry || "30days"}
                          onValueChange={(value) => handleSettingChange("responseExpiry", value)}
                        >
                          <SelectTrigger id="response-expiry" className="w-[180px]">
                            <SelectValue placeholder="Select expiry" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="7days">7 days</SelectItem>
                            <SelectItem value="30days">30 days</SelectItem>
                            <SelectItem value="90days">90 days</SelectItem>
                            <SelectItem value="1year">1 year</SelectItem>
                            <SelectItem value="never">Never expire</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-4 mt-6">
                  <h3 className="font-semibold">Notifications</h3>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email-notifications">Email Notifications</Label>
                    <Switch
                      id="email-notifications"
                      checked={formSettings.sendEmailNotifications}
                      onCheckedChange={(checked) => handleSettingChange("sendEmailNotifications", checked)}
                    />
                  </div>
                  {formSettings.sendEmailNotifications && (
                    <div className="space-y-2 pl-6 border-l-2 border-muted mt-2">
                      <Label htmlFor="email-recipients">Email Recipients</Label>
                      <Input
                        id="email-recipients"
                        value={formSettings.emailRecipients}
                        onChange={handleEmailRecipientsChange}
                        placeholder="email@example.com, another@example.com"
                        className={emailError ? "border-red-500" : ""}
                      />
                      {emailError && (
                        <div className="text-xs text-red-500 flex items-center mt-1">
                          <AlertCircle className="h-3 w-3 mr-1" />
                          {emailError}
                        </div>
                      )}

                      <div className="mt-4">
                        <Label htmlFor="notification-subject">Email Subject</Label>
                        <Input
                          id="notification-subject"
                          value={formSettings.notificationSubject || "New form submission"}
                          onChange={(e) => handleSettingChange("notificationSubject", e.target.value)}
                          placeholder="New form submission"
                          className="mt-1"
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-4 mt-6">
                  <h3 className="font-semibold">Form Limits</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="max-submissions">Maximum Submissions</Label>
                      <Input
                        id="max-submissions"
                        type="number"
                        className="w-24"
                        value={formSettings.maxSubmissions || ""}
                        onChange={(e) => handleSettingChange("maxSubmissions", e.target.value)}
                        placeholder="Unlimited"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="submission-timeframe">Submission Timeframe</Label>
                      <Select
                        defaultValue={formSettings.submissionTimeframe || "unlimited"}
                        onValueChange={(value) => handleSettingChange("submissionTimeframe", value)}
                      >
                        <SelectTrigger id="submission-timeframe" className="w-[180px]">
                          <SelectValue placeholder="Select timeframe" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="unlimited">Unlimited</SelectItem>
                          <SelectItem value="1day">1 day</SelectItem>
                          <SelectItem value="1week">1 week</SelectItem>
                          <SelectItem value="1month">1 month</SelectItem>
                          <SelectItem value="custom">Custom date</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-semibold">Form Behavior</h3>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="auto-save">Auto-save user progress</Label>
                    <Switch
                      id="auto-save"
                      checked={formSettings.autoSave || false}
                      onCheckedChange={(checked) => handleSettingChange("autoSave", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="show-progress">Show progress indicator</Label>
                    <Switch
                      id="show-progress"
                      checked={formSettings.showProgress || false}
                      onCheckedChange={(checked) => handleSettingChange("showProgress", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="required-asterisk">Show asterisk for required fields</Label>
                    <Switch
                      id="required-asterisk"
                      checked={formSettings.showRequiredAsterisk !== false}
                      onCheckedChange={(checked) => handleSettingChange("showRequiredAsterisk", checked)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="submit-button-text">Submit Button Text</Label>
                    <Input
                      id="submit-button-text"
                      value={formSettings.submitButtonText || "Submit"}
                      onChange={(e) => handleSettingChange("submitButtonText", e.target.value)}
                      placeholder="Submit"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold">Validation</h3>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="inline-validation">Inline validation</Label>
                    <Switch
                      id="inline-validation"
                      checked={formSettings.inlineValidation !== false}
                      onCheckedChange={(checked) => handleSettingChange("inlineValidation", checked)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Validation Timing</Label>
                    <div className="grid grid-cols-3 gap-2">
                      <Button
                        variant={formSettings.validationTiming === "onBlur" ? "default" : "outline"}
                        onClick={() => handleSettingChange("validationTiming", "onBlur")}
                      >
                        On Blur
                      </Button>
                      <Button
                        variant={formSettings.validationTiming === "onChange" ? "default" : "outline"}
                        onClick={() => handleSettingChange("validationTiming", "onChange")}
                      >
                        On Change
                      </Button>
                      <Button
                        variant={formSettings.validationTiming === "onSubmit" ? "default" : "outline"}
                        onClick={() => handleSettingChange("validationTiming", "onSubmit")}
                      >
                        On Submit
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold">Branding</h3>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="show-branding">Show "Powered by Hushwork ❤️"</Label>
                    <Switch
                      id="show-branding"
                      checked={formSettings.showBranding !== false}
                      onCheckedChange={(checked) => handleSettingChange("showBranding", checked)}
                    />
                  </div>

                  {formSettings.showBranding !== false && (
                    <div className="space-y-2">
                      <Label htmlFor="branding-position">Branding Position</Label>
                      <Select
                        defaultValue={formSettings.brandingPosition || "bottom"}
                        onValueChange={(value) => handleSettingChange("brandingPosition", value)}
                      >
                        <SelectTrigger id="branding-position">
                          <SelectValue placeholder="Select position" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="top">Top</SelectItem>
                          <SelectItem value="bottom">Bottom</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </ScrollArea>
  )
}

