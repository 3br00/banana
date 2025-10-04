import React from 'react';
import { ImageFile } from '../types';
import ImageUploader from './ImageUploader';
import ResultDisplay from './ResultDisplay';
import { useAppContext } from '../contexts/AppContext';

interface ImageWorkspaceProps {
  productImage: ImageFile | null;
  onProductImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveProductImage: () => void;
  generatedImage: ImageFile | null;
  isLoading: boolean;
}

const ImageWorkspace: React.FC<ImageWorkspaceProps> = ({ productImage, onProductImageUpload, onRemoveProductImage, generatedImage, isLoading }) => {
  const { t } = useAppContext();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
      <div className="flex flex-col items-center gap-4">
        <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300">{t('workspace.uploadTitle')}</h3>
        <ImageUploader 
            id="product-uploader"
            title={t('uploader.product')}
            image={productImage}
            onImageUpload={onProductImageUpload}
            onRemove={onRemoveProductImage}
        />
      </div>
      <div className="flex flex-col items-center gap-4">
        <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300">{t('workspace.resultTitle')}</h3>
        <ResultDisplay 
            imageFile={generatedImage}
            isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default ImageWorkspace;