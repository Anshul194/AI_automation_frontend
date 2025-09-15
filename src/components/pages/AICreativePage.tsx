import { useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { 
  Sparkles, 
  RefreshCw, 
  Plus, 
  X, 
  Upload, 
  ChevronDown,
  Shuffle,
  Layers,
  Users,
  MapPin,
  Image as ImageIcon,
  Download,
  Edit,
  Trash2,
  MoreHorizontal,
  Minus
} from "lucide-react";

export function AICreativePage() {
  const [generationInProgress, setGenerationInProgress] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<'my-generations' | 'community'>('my-generations');
  
  // Drawer state
  const [referenceImages, setReferenceImages] = useState<File[]>([]);
  const [productImages, setProductImages] = useState<File[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [prompt, setPrompt] = useState('');
  const [selectedRatio, setSelectedRatio] = useState('1:1');
  const [numberOfImages, setNumberOfImages] = useState(3);

  const templates = [
    { 
      id: 'single-swap', 
      name: 'Single Reference Swap', 
      description: 'Replace one object with your product',
      icon: Shuffle 
    },
    { 
      id: 'multi-product', 
      name: 'Multi-Product Swap', 
      description: 'Multiple products in one scene',
      icon: Layers 
    },
    { 
      id: 'multi-reference', 
      name: 'Multi-Reference Fusion', 
      description: 'Blend multiple reference styles',
      icon: Users 
    },
    { 
      id: 'product-placement', 
      name: 'Product Placement', 
      description: 'Natural product integration',
      icon: MapPin 
    }
  ];

  const ratioOptions = [
    { value: '1:1', label: '1:1 (Square)', recommended: true },
    { value: '4:5', label: '4:5 (Portrait)' },
    { value: '9:16', label: '9:16 (Vertical)' },
    { value: '16:9', label: '16:9 (Landscape)' }
  ];

  const suggestionChips = ['Clean Studio', 'Lifestyle Gym', 'Festive Theme', 'UGC Handheld'];

  const mockGeneratedImages = [
    "https://images.unsplash.com/photo-1697560415980-8cc04e055cdb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhaSUyMGdlbmVyYXRlZCUyMGNyZWF0aXZlJTIwaW1hZ2VzfGVufDF8fHx8MTc1NzAzMzY3OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1657627157615-370fcbd7f6a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGRpZ2l0YWwlMjBhcnQlMjBjb2xvcmZ1bHxlbnwxfHx8fDE3NTcwMzM2ODJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1634585738250-09ee92cae0f8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmdXR1cmlzdGljJTIwZGlnaXRhbCUyMGRlc2lnbnxlbnwxfHx8fDE3NTcwMzM2ODV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1621249153915-1098c2c35f37?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcnQlMjBnZW9tZXRyaWMlMjBwYXR0ZXJuc3xlbnwxfHx8fDE3NTcwMzM2ODh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1687983131365-b8b06cc78bf9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMGFydCUyMGdlbmVyYXRpdmV8ZW58MXx8fHwxNzU3MDMzNjkyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1692607431822-b3ee89b2b6b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGFydCUyMGNvbG9yZnVsfGVufDF8fHx8MTc1NzAzMzY5NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  ];

  const handleGenerate = () => {
    setGenerationInProgress(true);
    setDrawerOpen(false);
    // Simulate AI generation process
    setTimeout(() => {
      const newImages = mockGeneratedImages.slice(0, numberOfImages);
      setGeneratedImages(newImages);
      setGenerationInProgress(false);
    }, 3500);
  };

  const handleQuickGenerate = () => {
    setGenerationInProgress(true);
    // Simulate AI generation process
    setTimeout(() => {
      setGeneratedImages([mockGeneratedImages[0]]);
      setGenerationInProgress(false);
    }, 3000);
  };

  const handleFileUpload = (files: FileList | null, type: 'reference' | 'product') => {
    if (!files) return;
    
    const newFiles = Array.from(files).slice(0, 3);
    if (type === 'reference') {
      setReferenceImages(prev => [...prev, ...newFiles].slice(0, 3));
    } else {
      setProductImages(prev => [...prev, ...newFiles].slice(0, 3));
    }
  };

  const removeImage = (index: number, type: 'reference' | 'product') => {
    if (type === 'reference') {
      setReferenceImages(prev => prev.filter((_, i) => i !== index));
    } else {
      setProductImages(prev => prev.filter((_, i) => i !== index));
    }
  };

  const adjustNumberOfImages = (delta: number) => {
    setNumberOfImages(prev => Math.max(1, Math.min(8, prev + delta)));
  };

  const renderDrawer = () => (
    <div className={`fixed inset-y-0 right-0 w-[520px] bg-[#1E293B] border-l border-[#374151] shadow-2xl transform transition-transform duration-300 ease-in-out z-50 ${
      drawerOpen ? 'translate-x-0' : 'translate-x-full'
    } relative`}>
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-[#374151]">
        <h2 className="text-xl font-bold text-white">AI Creative Generator</h2>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => setDrawerOpen(false)}
          className="text-[#94A3B8] hover:text-white"
        >
          <X className="h-5 w-5" />
        </Button>
      </div>

      {/* Content */}
      <div className="flex flex-col h-full">
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          
          {/* Section 1: Upload References */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Upload References</h3>
            <div 
              className="border-2 border-dashed border-[#374151] rounded-xl p-6 text-center hover:border-[#4F46E5] transition-colors cursor-pointer bg-[#111827]/50"
              onDrop={(e) => {
                e.preventDefault();
                handleFileUpload(e.dataTransfer.files, 'reference');
              }}
              onDragOver={(e) => e.preventDefault()}
              onClick={() => {
                const input = document.createElement('input');
                input.type = 'file';
                input.multiple = true;
                input.accept = 'image/*';
                input.onchange = (e) => handleFileUpload((e.target as HTMLInputElement).files, 'reference');
                input.click();
              }}
            >
              <Upload className="h-8 w-8 text-[#94A3B8] mx-auto mb-3" />
              <p className="text-sm text-[#94A3B8] mb-2">Drag & drop or click to upload</p>
              <p className="text-xs text-[#94A3B8]">
                {referenceImages.length}/3 images uploaded
              </p>
            </div>
            
            {referenceImages.length > 0 && (
              <div className="grid grid-cols-3 gap-3 mt-4">
                {referenceImages.map((file, index) => (
                  <div key={index} className="relative group">
                    <div className="w-full h-20 bg-[#111827] rounded-lg border border-[#374151] flex items-center justify-center">
                      <ImageIcon className="h-6 w-6 text-[#94A3B8]" />
                    </div>
                    <button
                      onClick={() => removeImage(index, 'reference')}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-3 w-3 text-white" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Section 2: Upload Product Images */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Upload Product Images</h3>
            <div 
              className="border-2 border-dashed border-[#374151] rounded-xl p-6 text-center hover:border-[#4F46E5] transition-colors cursor-pointer bg-[#111827]/50"
              onDrop={(e) => {
                e.preventDefault();
                handleFileUpload(e.dataTransfer.files, 'product');
              }}
              onDragOver={(e) => e.preventDefault()}
              onClick={() => {
                const input = document.createElement('input');
                input.type = 'file';
                input.multiple = true;
                input.accept = 'image/*';
                input.onchange = (e) => handleFileUpload((e.target as HTMLInputElement).files, 'product');
                input.click();
              }}
            >
              <Upload className="h-8 w-8 text-[#94A3B8] mx-auto mb-3" />
              <p className="text-sm text-[#94A3B8] mb-2">Drag & drop or click to upload</p>
              <p className="text-xs text-[#94A3B8]">
                {productImages.length}/3 images uploaded
              </p>
            </div>
            
            {productImages.length > 0 && (
              <div className="grid grid-cols-3 gap-3 mt-4">
                {productImages.map((file, index) => (
                  <div key={index} className="relative group">
                    <div className="w-full h-20 bg-[#111827] rounded-lg border border-[#374151] flex items-center justify-center">
                      <ImageIcon className="h-6 w-6 text-[#94A3B8]" />
                    </div>
                    <button
                      onClick={() => removeImage(index, 'product')}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-3 w-3 text-white" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Section 3: Choose a Template */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Choose a Template</h3>
            <div className="grid grid-cols-2 gap-3">
              {templates.map((template) => (
                <div
                  key={template.id}
                  onClick={() => setSelectedTemplate(template.id)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    selectedTemplate === template.id
                      ? 'border-[#4F46E5] bg-gradient-to-br from-[#4F46E5]/20 to-[#6C63FF]/20'
                      : 'border-[#374151] bg-[#111827]/50 hover:border-[#4F46E5]/50'
                  }`}
                >
                  <template.icon className={`h-6 w-6 mb-3 ${
                    selectedTemplate === template.id ? 'text-[#4F46E5]' : 'text-[#94A3B8]'
                  }`} />
                  <h4 className="font-medium text-white text-sm mb-1">{template.name}</h4>
                  <p className="text-xs text-[#94A3B8]">{template.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Section 4: Prompt Section */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Prompt Section</h3>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe what you want to see in the ad..."
              className="w-full h-24 p-4 bg-[#111827] border border-[#374151] rounded-xl text-white placeholder-[#94A3B8] resize-none focus:outline-none focus:ring-2 focus:ring-[#4F46E5] mb-4"
            />
            
            {/* Suggestion Chips */}
            <div className="flex flex-wrap gap-2">
              {suggestionChips.map((chip) => (
                <button
                  key={chip}
                  onClick={() => setPrompt(prev => prev + (prev ? ', ' : '') + chip)}
                  className="px-3 py-2 text-xs font-medium bg-[#111827] border border-[#374151] rounded-lg text-[#94A3B8] hover:border-[#4F46E5] hover:text-[#4F46E5] transition-colors"
                >
                  {chip}
                </button>
              ))}
            </div>
          </div>

          {/* Section 5: Settings */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Settings</h3>
            
            {/* Ratio Dropdown */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">Ratio</label>
              <div className="relative">
                <select
                  value={selectedRatio}
                  onChange={(e) => setSelectedRatio(e.target.value)}
                  className="w-full p-3 bg-[#111827] border border-[#374151] rounded-xl text-white appearance-none focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                >
                  {ratioOptions.map((ratio) => (
                    <option key={ratio.value} value={ratio.value}>
                      {ratio.label} {ratio.recommended ? '(Recommended)' : ''}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#94A3B8] pointer-events-none" />
              </div>
            </div>

            {/* Number of Images Stepper */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">Number of images</label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => adjustNumberOfImages(-1)}
                  className="w-10 h-10 bg-[#111827] border border-[#374151] rounded-lg flex items-center justify-center text-[#94A3B8] hover:border-[#4F46E5] hover:text-[#4F46E5] transition-colors"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="text-white font-medium min-w-[2rem] text-center">{numberOfImages}</span>
                <button
                  onClick={() => adjustNumberOfImages(1)}
                  className="w-10 h-10 bg-[#111827] border border-[#374151] rounded-lg flex items-center justify-center text-[#94A3B8] hover:border-[#4F46E5] hover:text-[#4F46E5] transition-colors"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Generate Button */}
        <div className="p-6 border-t border-[#374151]">
          <Button
            onClick={handleGenerate}
            disabled={generationInProgress}
            className="w-full bg-gradient-to-r from-[#4F46E5] to-[#6C63FF] hover:from-[#4338CA] hover:to-[#5B21B6] text-white py-4 text-lg font-semibold rounded-xl flex items-center justify-center gap-3 transition-all duration-200"
          >
            {generationInProgress ? (
              <>
                <RefreshCw className="h-5 w-5 animate-spin" />
                Image Generating...
              </>
            ) : (
              <>
                <Sparkles className="h-5 w-5" />
                Generate
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Loading Overlay inside Drawer */}
      {generationInProgress && (
        <div className="absolute inset-0 bg-[#0F172A]/90 backdrop-blur-sm z-30 flex items-center justify-center">
          <div className="text-center space-y-4">
            <RefreshCw className="h-16 w-16 text-[#4F46E5] mx-auto animate-spin" />
            <div>
              <h3 className="text-xl font-semibold text-white">Image Generating...</h3>
              <p className="text-[#94A3B8]">Please wait while we create your unique images</p>
            </div>
            <div className="w-64 bg-[#374151] rounded-full h-2 mx-auto">
              <div className="bg-gradient-to-r from-[#4F46E5] to-[#6C63FF] h-2 rounded-full animate-pulse transition-all duration-300" style={{ width: '65%' }}></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <>
      <div className="bg-[#111827] min-h-screen">
        {/* Top Bar */}
        <div className="px-6 py-4 border-b border-[#374151] bg-[#0F172A]">
          <div className="flex items-center justify-between">
            {/* Left side: Tabs */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => setActiveTab('my-generations')}
                className={`px-6 py-3 rounded-xl font-medium transition-all ${
                  activeTab === 'my-generations'
                    ? 'bg-gradient-to-r from-[#4F46E5] to-[#6C63FF] text-white'
                    : 'text-[#94A3B8] hover:text-white hover:bg-[#1E293B]'
                }`}
              >
                My AI Generations
              </button>
              <button
                onClick={() => setActiveTab('community')}
                className={`px-6 py-3 rounded-xl font-medium transition-all ${
                  activeTab === 'community'
                    ? 'bg-gradient-to-r from-[#4F46E5] to-[#6C63FF] text-white'
                    : 'text-[#94A3B8] hover:text-white hover:bg-[#1E293B]'
                }`}
              >
                Community AI Generations
              </button>
            </div>

            {/* Right side: Generate Button */}
            <Button
              onClick={() => setDrawerOpen(true)}
              className="bg-gradient-to-r from-[#4F46E5] to-[#6C63FF] hover:from-[#4338CA] hover:to-[#5B21B6] text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all duration-200"
            >
              <Sparkles className="h-4 w-4" />
              Generate with AI
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6">
          {generatedImages.length > 0 ? (
            <div className="space-y-8">
              {/* Full-width section with heading and subtext - shown even after generation */}
              <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold text-white">AI Creative Generator</h1>
                <p className="text-xl text-[#94A3B8]">Generate stunning AI images with a single click</p>
              </div>

              {/* Generated Images Gallery below hero area */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {generatedImages.map((image, index) => (
                  <div key={index} className="group relative">
                    <Card className="bg-[#1E293B] border-[#374151] p-0 overflow-hidden rounded-xl hover:shadow-2xl hover:shadow-[#4F46E5]/20 transition-all duration-300 cursor-pointer">
                      <img 
                        src={image} 
                        alt={`Generated Image ${index + 1}`} 
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-3">
                        <div className="flex items-center justify-between">
                          <Badge className="bg-[#4F46E5]/20 text-[#4F46E5] text-xs border-[#4F46E5]/30">
                            AI Generated
                          </Badge>
                          <span className="text-xs text-[#94A3B8]">
                            Just now
                          </span>
                        </div>
                      </div>
                      
                      {/* Context Menu on Hover */}
                      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="flex gap-2">
                          <button className="w-8 h-8 bg-black/50 backdrop-blur-sm rounded-lg flex items-center justify-center text-white hover:bg-black/70 transition-colors">
                            <Download className="h-4 w-4" />
                          </button>
                          <button className="w-8 h-8 bg-black/50 backdrop-blur-sm rounded-lg flex items-center justify-center text-white hover:bg-black/70 transition-colors">
                            <Edit className="h-4 w-4" />
                          </button>
                          <button className="w-8 h-8 bg-black/50 backdrop-blur-sm rounded-lg flex items-center justify-center text-white hover:bg-black/70 transition-colors">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* Hero/Empty State */
            <div className="max-w-4xl mx-auto text-center space-y-8 py-20">
              {/* Full-width section with heading and subtext */}
              <div className="space-y-4">
                <h1 className="text-4xl font-bold text-white">AI Creative Generator</h1>
                <p className="text-xl text-[#94A3B8]">Generate stunning AI images with a single click</p>
              </div>

              {/* Large central placeholder state */}
              <Card className="bg-[#1E293B] border-[#374151] max-w-2xl mx-auto rounded-xl shadow-2xl">
                <div className="py-20 px-8 text-center space-y-6">
                  {generationInProgress ? (
                    <div className="space-y-4">
                      <RefreshCw className="h-20 w-20 text-[#4F46E5] mx-auto animate-spin" />
                      <div>
                        <h3 className="text-2xl font-semibold text-white">Image Generating...</h3>
                        <p className="text-[#94A3B8]">Please wait while we create your unique AI images</p>
                      </div>
                      <div className="w-80 bg-[#374151] rounded-full h-3 mx-auto">
                        <div className="bg-gradient-to-r from-[#4F46E5] to-[#6C63FF] h-3 rounded-full animate-pulse transition-all duration-300" style={{ width: '70%' }}></div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <Sparkles className="h-20 w-20 text-[#94A3B8] mx-auto" />
                      <div>
                        <h3 className="text-2xl font-semibold text-white">Ready to Create</h3>
                        <p className="text-[#94A3B8]">Click the button below to generate your AI image</p>
                      </div>
                    </div>
                  )}
                </div>
              </Card>

              {/* Bottom center primary button */}
              {!generationInProgress && (
                <div>
                  <Button
                    onClick={handleQuickGenerate}
                    className="bg-gradient-to-r from-[#4F46E5] to-[#6C63FF] hover:from-[#4338CA] hover:to-[#5B21B6] text-white px-12 py-4 text-xl font-bold rounded-xl flex items-center gap-4 mx-auto shadow-2xl shadow-[#4F46E5]/25 hover:shadow-[#4F46E5]/40 transition-all duration-200"
                  >
                    <Sparkles className="h-6 w-6" />
                    Generate AI Image
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Drawer */}
      {renderDrawer()}

      {/* Overlay */}
      {drawerOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
          onClick={() => setDrawerOpen(false)}
        />
      )}
    </>
  );
}