
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Copy, Check, Code, LinkIcon, ExternalLink } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export function FormEmbed({ formTitle, formId }) {
  const [copied, setCopied] = useState({
    iframe: false,
    javascript: false,
    link: false,
  })
  const [formUrl, setFormUrl] = useState("")
  const [customOptions, setCustomOptions] = useState({
    autoResize: true,
    hideTitle: false,
    transparentBackground: false,
    customHeight: "600",
  })
  const [previewVisible, setPreviewVisible] = useState(false)

  useEffect(() => {
    // Generate a unique form URL based on the form ID
    const baseUrl = window.location.origin
    setFormUrl(`${baseUrl}/forms/${formId}`)
  }, [formId])

  const getIframeCode = () => {
    let code = `<iframe 
src="${formUrl}/embed${customOptions.hideTitle ? "?hideTitle=true" : ""}" 
width="100%" 
height="${customOptions.customHeight}px" 
frameborder="0" 
marginheight="0" 
marginwidth="0"
${customOptions.autoResize ? 'scrolling="no" onload="resizeIframe(this)"' : ""}
${customOptions.transparentBackground ? 'style="background: transparent;"' : ""}
>
Loading...
</iframe>`

    if (customOptions.autoResize) {
      code += `
<script>
  function resizeIframe(obj) {
    obj.style.height = obj.contentWindow.document.documentElement.scrollHeight + 'px';
  }
</script>`
    }

    return code
  }

  const getJavascriptCode = () => {
    return `<div id="formcraft-form-${formId}"></div>
<script src="${window.location.origin}/embed.js" 
  data-form-id="${formId}"
  ${customOptions.hideTitle ? 'data-hide-title="true"' : ""}
  ${customOptions.transparentBackground ? 'data-transparent="true"' : ""}
></script>`
  }

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied({ ...copied, [type]: true })
      setTimeout(() => {
        setCopied({ ...copied, [type]: false })
      }, 2000)
    })
  }

  const handleOptionChange = (option, value) => {
    setCustomOptions({
      ...customOptions,
      [option]: value,
    })
  }

  return (
    <ScrollArea className="h-[calc(100vh-12rem)]">
      <div className="p-6 max-w-3xl mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2">Embed Your Form</h2>
          <p className="text-muted-foreground">
            Share your form by embedding it on your website or sharing a direct link.
          </p>
        </div>

        <Tabs defaultValue="iframe">
          <TabsList className="w-full grid grid-cols-3 mb-6">
            <TabsTrigger value="iframe">
              <Code className="mr-2 h-4 w-4" />
              iFrame Embed
            </TabsTrigger>
            <TabsTrigger value="javascript">
              <Code className="mr-2 h-4 w-4" />
              JavaScript
            </TabsTrigger>
            <TabsTrigger value="link">
              <LinkIcon className="mr-2 h-4 w-4" />
              Direct Link
            </TabsTrigger>
          </TabsList>

          <TabsContent value="iframe">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Customize Embed</CardTitle>
                <CardDescription>
                  Adjust these settings to customize how your form appears when embedded.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="auto-resize">Auto-resize height</Label>
                    <Switch
                      id="auto-resize"
                      checked={customOptions.autoResize}
                      onCheckedChange={(checked) => handleOptionChange("autoResize", checked)}
                    />
                  </div>

                  {!customOptions.autoResize && (
                    <div className="space-y-2">
                      <Label htmlFor="custom-height">Custom height (px)</Label>
                      <Input
                        id="custom-height"
                        type="number"
                        value={customOptions.customHeight}
                        onChange={(e) => handleOptionChange("customHeight", e.target.value)}
                      />
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <Label htmlFor="hide-title">Hide form title</Label>
                    <Switch
                      id="hide-title"
                      checked={customOptions.hideTitle}
                      onCheckedChange={(checked) => handleOptionChange("hideTitle", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="transparent-bg">Transparent background</Label>
                    <Switch
                      id="transparent-bg"
                      checked={customOptions.transparentBackground}
                      onCheckedChange={(checked) => handleOptionChange("transparentBackground", checked)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>iFrame Embed Code</CardTitle>
                <CardDescription>Copy and paste this code into your HTML to embed the form.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Textarea value={getIframeCode()} readOnly className="font-mono text-sm h-32" />
                  <div className="flex gap-2">
                    <Button
                      onClick={() => copyToClipboard(getIframeCode(), "iframe")}
                      variant="outline"
                      className="flex-1"
                    >
                      {copied.iframe ? (
                        <>
                          <Check className="mr-2 h-4 w-4" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="mr-2 h-4 w-4" />
                          Copy Code
                        </>
                      )}
                    </Button>
                    <Button variant="secondary" onClick={() => setPreviewVisible(!previewVisible)}>
                      {previewVisible ? "Hide Preview" : "Show Preview"}
                    </Button>
                  </div>

                  {previewVisible && (
                    <div className="mt-4 border rounded-md p-4">
                      <div className="text-sm font-medium mb-2">Preview:</div>
                      <div className="bg-gray-100 rounded-md p-4 h-64 overflow-auto">
                        <div className="bg-white p-4 rounded-md shadow-sm">
                          <h3 className="text-lg font-semibold mb-2">{formTitle}</h3>
                          <div className="space-y-3">
                            <div className="space-y-1">
                              <label className="text-sm font-medium">Name</label>
                              <input
                                type="text"
                                className="w-full p-2 border rounded-md"
                                placeholder="Enter your name"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-sm font-medium">Email</label>
                              <input
                                type="email"
                                className="w-full p-2 border rounded-md"
                                placeholder="Enter your email"
                              />
                            </div>
                            <Button size="sm">Submit</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="javascript">
            <Card>
              <CardHeader>
                <CardTitle>JavaScript Embed Code</CardTitle>
                <CardDescription>
                  This method provides more flexibility and better mobile responsiveness.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Textarea value={getJavascriptCode()} readOnly className="font-mono text-sm h-32" />
                  <Button
                    onClick={() => copyToClipboard(getJavascriptCode(), "javascript")}
                    variant="outline"
                    className="w-full"
                  >
                    {copied.javascript ? (
                      <>
                        <Check className="mr-2 h-4 w-4" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="mr-2 h-4 w-4" />
                        Copy Code
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="link">
            <Card>
              <CardHeader>
                <CardTitle>Direct Link</CardTitle>
                <CardDescription>Share this link directly with your users.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center border rounded-md p-3 bg-muted/30">
                    <span className="text-sm font-medium truncate flex-1">{formUrl}</span>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={() => copyToClipboard(formUrl, "link")} variant="outline" className="flex-1">
                      {copied.link ? (
                        <>
                          <Check className="mr-2 h-4 w-4" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="mr-2 h-4 w-4" />
                          Copy Link
                        </>
                      )}
                    </Button>
                    <Button variant="secondary" onClick={() => window.open(formUrl, "_blank")}>
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Open
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-8 space-y-4">
          <h3 className="text-lg font-semibold">Embedding Tips</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardContent className="p-4">
                <h4 className="font-medium mb-2">Responsive Design</h4>
                <p className="text-sm text-muted-foreground">
                  The embedded form will automatically adjust to fit the container width on your website.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <h4 className="font-medium mb-2">Custom Styling</h4>
                <p className="text-sm text-muted-foreground">
                  You can add custom CSS to match your website's design when using the JavaScript embed method.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <h4 className="font-medium mb-2">Form Updates</h4>
                <p className="text-sm text-muted-foreground">
                  Any changes you make to your form will automatically reflect in all embedded instances.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <h4 className="font-medium mb-2">Data Collection</h4>
                <p className="text-sm text-muted-foreground">
                  All submissions are securely stored in your FormCraft dashboard regardless of where the form is
                  embedded.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </ScrollArea>
  )
}

