import React from 'react';
import { ImageFile } from '../types';
import { useAppContext } from '../contexts/AppContext';

interface ImageUploaderProps {
  onImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onRemove: () => void;
  image: ImageFile | null;
  title: string;
  id: string;
}

const UploadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
    </svg>
);

const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload, onRemove, image, title, id }) => {
  const { t } = useAppContext();
  return (
    <div className="w-full">
      <div className="relative">
        <label htmlFor={id} className="cursor-pointer group">
          <div className="relative border-2 border-dashed border-gray-400/50 dark:border-white/10 rounded-xl p-6 text-center hover:border-amber-400/80 transition-all duration-300 bg-black/5 dark:bg-black/10 backdrop-blur-sm flex flex-col justify-center items-center aspect-square">
            {image ? (
              <img src={`data:${image.mimeType};base64,${image.base64}`} alt={title} className="absolute inset-0 w-full h-full object-contain rounded-xl" />
            ) : (
              <div className="flex flex-col items-center">
                <UploadIcon />
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 group-hover:text-gray-800 dark:group-hover:text-white transition-colors">{title}</p>
              </div>
            )}
          </div>
        </label>
        {image && (
            <button
                onClick={(e) => { e.preventDefault(); onRemove(); }}
                className="absolute top-2 right-2 z-10 p-1.5 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
                aria-label={t('uploader.remove')}
                title={t('uploader.remove')}
            >
                <CloseIcon />
            </button>
        )}
      </div>
      <input id={id} type="file" className="hidden" accept="image/jpeg, image/png, image/webp" onChange={onImageUpload} onClick={(e) => (e.currentTarget.value = '')}/>
    </div>
  );
};

export default ImageUploader;