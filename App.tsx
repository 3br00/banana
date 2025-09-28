import React, { useState, useEffect, useCallback } from 'react';
import { CustomizationOptions, ImageFile } from './types';
import { generateImage, analyzeStyleImage } from './services/geminiService';
import CustomizationPanel from './components/CustomizationPanel';
import ImageWorkspace from './components/ImageWorkspace';
import PromptEditor from './components/PromptEditor';
import Header from './components/Header';
import { LIGHTING_STYLES, CAMERA_PERSPECTIVES } from './constants';
import { useAppContext } from './contexts/AppContext';

const SUPPORTED_IMAGE_FORMATS = ['image/jpeg', 'image/png', 'image/webp'];

function App() {
  const { t } = useAppContext();
  const [productImage, setProductImage] = useState<ImageFile | null>(null);
  const [styleImage, setStyleImage] = useState<ImageFile | null>(null);
  const [generatedImage, setGeneratedImage] = useState<ImageFile | null>(null);
  
  const [styleDescription, setStyleDescription] = useState<string | null>(null);
  const [isAnalyzingStyle, setIsAnalyzingStyle] = useState<boolean>(false);

  const [options, setOptions] = useState<CustomizationOptions>({
    lightingStyle: LIGHTING_STYLES[0].value,
    cameraPerspective: CAMERA_PERSPECTIVES[0].value,
  });

  const [prompt, setPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    if (styleImage) {
      const getStyleDescription = async () => {
        setIsAnalyzingStyle(true);
        setError(null);
        try {
          const description = await analyzeStyleImage(styleImage);
          setStyleDescription(description);
        } catch (err) {
          console.error(err);
          setError(t('errors.styleAnalysis'));
          setStyleDescription(null);
        } finally {
          setIsAnalyzingStyle(false);
        }
      };
      getStyleDescription();
    } else {
      setStyleDescription(null);
    }
  }, [styleImage, t]);


  useEffect(() => {
    const generateNewPrompt = () => {
      if (!productImage) return '';
      let newPrompt = `Generate a high-resolution, professional product photograph of the subject in the provided image.

Key requirements:
- Lighting: Illuminate the scene with a ${options.lightingStyle} style. The lighting should be flattering and highlight the product's details.
- Camera Perspective: Capture the product from a ${options.cameraPerspective}.
- Background: The background should be clean, non-distracting, and complementary to the product. A subtle, high-end studio setting is preferred.
- Overall Mood: The image should feel premium, clean, and aspirational.`;

      if (styleImage) {
        if (isAnalyzingStyle) {
            newPrompt += `\n\n- Style Reference: Analyzing the provided style reference image...`;
        } else if (styleDescription) {
            newPrompt += `\n\n- Style Reference: Strictly adhere to the aesthetic of the provided style reference image, which has a ${styleDescription}. The goal is to make the product look as if it belongs in the same visual world.`;
        } else {
             newPrompt += `\n\n- Style Reference: Strictly adhere to the aesthetic, color palette, texture, and overall mood of the provided style reference image. The goal is to make the product look as if it belongs in the same visual world as the style reference.`;
        }
      }

      setPrompt(newPrompt);
    };
    generateNewPrompt();
  }, [options, productImage, styleImage, styleDescription, isAnalyzingStyle]);
  
  const handleGenerate = useCallback(async () => {
    if (!productImage || !prompt) {
      setError(t('errors.uploadAndPrompt'));
      return;
    }
    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);

    try {
      const result = await generateImage(productImage, prompt, styleImage);
      setGeneratedImage(result);
    } catch (err) {
      console.error(err);
      setError(t('errors.generation'));
    } finally {
      setIsLoading(false);
    }
  }, [productImage, prompt, styleImage, t]);

  const handleFileChange = (setter: React.Dispatch<React.SetStateAction<ImageFile | null>>) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!SUPPORTED_IMAGE_FORMATS.includes(file.type)) {
        setError(t('errors.unsupportedFileType'));
        event.target.value = ''; // Reset input
        return;
      }
      
      setError(null); // Clear previous errors on successful selection

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setter({
          base64: base64String.split(',')[1],
          mimeType: file.type,
          name: file.name
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const GenerateButton = ({ className = '' }: { className?: string }) => (
    <button 
        onClick={handleGenerate}
        disabled={isLoading || !productImage || isAnalyzingStyle}
        className={`w-full bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-stone-800 font-bold py-3 px-4 rounded-lg text-lg transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-2xl hover:shadow-amber-500/20 disabled:shadow-none transform hover:-translate-y-1 disabled:transform-none ${className}`}
    >
        {isAnalyzingStyle ? t('buttons.analyzing') : isLoading ? t('buttons.generating') : t('buttons.generate')}
    </button>
  );


  return (
    <div className="min-h-screen w-full flex flex-col items-center p-4">
      <Header />
      
      <main className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-8 pb-28 lg:pb-0">
        <div className="lg:col-span-2">
            <ImageWorkspace 
                productImage={productImage} 
                onProductImageChange={handleFileChange(setProductImage)}
                generatedImage={generatedImage}
                isLoading={isLoading}
            />
        </div>

        <div className="lg:col-span-1 flex flex-col gap-4 lg:gap-8">
            <CustomizationPanel 
                options={options}
                setOptions={setOptions}
                styleImage={styleImage}
                onStyleImageChange={handleFileChange(setStyleImage)}
                isAnalyzingStyle={isAnalyzingStyle}
            />
            <PromptEditor 
                prompt={prompt}
                setPrompt={setPrompt}
            />
            {error && <div className="bg-red-900/50 border border-red-700 text-red-200 px-4 py-3 rounded-lg" role="alert">{error}</div>}
            
            {/* Desktop button */}
            <GenerateButton className="hidden lg:block" />
        </div>
      </main>
      
      {/* Mobile sticky button */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 bg-[var(--background-color)]/80 backdrop-blur-sm border-t border-[var(--card-border)] z-10">
        <GenerateButton />
      </div>

    </div>
  );
}

export default App;