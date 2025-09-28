import React from 'react';
import { CustomizationOptions, ImageFile } from '../types';
import { LIGHTING_STYLES, CAMERA_PERSPECTIVES } from '../constants';
import ImageUploader from './ImageUploader';
import { useAppContext } from '../contexts/AppContext';

interface CustomizationPanelProps {
  options: CustomizationOptions;
  setOptions: React.Dispatch<React.SetStateAction<CustomizationOptions>>;
  styleImage: ImageFile | null;
  onStyleImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isAnalyzingStyle: boolean;
}

const CustomSelect: React.FC<{ label: string; value: string; onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void; options: { value: string; label: string }[] }> = ({ label, value, onChange, options }) => (
    <div>
        <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">{label}</label>
        <select value={value} onChange={onChange} className="w-full glass-input rounded-md py-2 px-3 transition-all">
            {options.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
        </select>
    </div>
);


const CustomizationPanel: React.FC<CustomizationPanelProps> = ({ options, setOptions, styleImage, onStyleImageUpload, isAnalyzingStyle }) => {
  const { t } = useAppContext();
  
  const handleChange = <K extends keyof CustomizationOptions,>(key: K, value: CustomizationOptions[K]) => {
    setOptions(prev => ({ ...prev, [key]: value }));
  };

  const translatedLightingStyles = LIGHTING_STYLES.map(style => ({...style, label: t(style.labelKey)}));
  const translatedCameraPerspectives = CAMERA_PERSPECTIVES.map(p => ({...p, label: t(p.labelKey)}));


  return (
    <div className="glass-card rounded-2xl p-4 md:p-6 flex flex-col gap-4 md:gap-6">
      <h2 className="text-xl font-bold">{t('customize.title')}</h2>
      
      <CustomSelect 
        label={t('customize.lightingStyle')}
        value={options.lightingStyle}
        onChange={(e) => handleChange('lightingStyle', e.target.value as CustomizationOptions['lightingStyle'])}
        options={translatedLightingStyles}
      />

      <CustomSelect 
        label={t('customize.cameraPerspective')}
        value={options.cameraPerspective}
        onChange={(e) => handleChange('cameraPerspective', e.target.value as CustomizationOptions['cameraPerspective'])}
        options={translatedCameraPerspectives}
      />

      <div>
        <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">{t('customize.styleReference')}</label>
        <div className="relative">
            <ImageUploader 
                id="style-uploader"
                title={t('customize.uploadStyleImage')}
                image={styleImage}
                onImageUpload={onStyleImageUpload}
            />
            {isAnalyzingStyle && (
                <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center rounded-xl backdrop-blur-sm">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-amber-500"></div>
                <p className="text-sm text-white mt-2">{t('customize.analyzingStyle')}</p>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default CustomizationPanel;