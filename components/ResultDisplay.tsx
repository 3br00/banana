import React, { useState } from 'react';
import { ImageFile } from '../types';
import { useAppContext } from '../contexts/AppContext';

interface ResultDisplayProps {
  imageFile: ImageFile | null;
  isLoading: boolean;
}

const DownloadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 me-2" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
);


const LoadingSpinner = () => {
    const { t } = useAppContext();
    return (
        <div role="status" className="flex flex-col items-center justify-center gap-2 h-full">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-amber-500"></div>
            <p className="text-gray-500 dark:text-gray-400">{t('buttons.generating')}</p>
        </div>
    );
};

const ResultDisplay: React.FC<ResultDisplayProps> = ({ imageFile, isLoading }) => {
    const { t } = useAppContext();
    const [isDownloading, setIsDownloading] = useState(false);

    const handleDownload = (resolution: '2k' | '4k') => {
        if (!imageFile) return;

        setIsDownloading(true);
        const img = new Image();
        img.src = `data:${imageFile.mimeType};base64,${imageFile.base64}`;
        img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            if (!ctx) {
                setIsDownloading(false);
                return;
            };

            const targetWidth = resolution === '4k' ? 4096 : 2048;
            const aspectRatio = img.width / img.height;
            
            canvas.width = targetWidth;
            canvas.height = targetWidth / aspectRatio;

            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            const link = document.createElement('a');
            link.download = `generated-${resolution}-${Date.now()}.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();
            setIsDownloading(false);
        }
        img.onerror = () => {
             setIsDownloading(false);
        }
    };

    return (
        <div className="w-full flex flex-col gap-4">
            <div className="w-full aspect-square bg-black/5 dark:bg-black/10 backdrop-blur-sm border-2 border-dashed border-gray-400/50 dark:border-white/10 rounded-xl flex items-center justify-center overflow-hidden">
                {isLoading && <LoadingSpinner />}
                {!isLoading && !imageFile && <span className="text-gray-500 dark:text-gray-500">{t('result.placeholder')}</span>}
                {!isLoading && imageFile && (
                    <img 
                        src={`data:${imageFile.mimeType};base64,${imageFile.base64}`} 
                        alt="Generated Result" 
                        className="object-contain w-full h-full"
                    />
                )}
            </div>
            {imageFile && !isLoading && (
                <div className="flex gap-4">
                    <button 
                        onClick={() => handleDownload('2k')}
                        disabled={isDownloading}
                        className="flex-1 inline-flex items-center justify-center bg-gray-500/10 hover:bg-gray-500/20 dark:bg-white/5 dark:hover:bg-white/10 border border-gray-500/20 dark:border-white/10 font-semibold py-2 px-4 rounded-md transition-colors disabled:opacity-50"
                    >
                        <DownloadIcon />
                        {t('result.download2k')}
                    </button>
                    <button 
                        onClick={() => handleDownload('4k')}
                        disabled={isDownloading}
                        className="flex-1 inline-flex items-center justify-center bg-gray-500/10 hover:bg-gray-500/20 dark:bg-white/5 dark:hover:bg-white/10 border border-gray-500/20 dark:border-white/10 font-semibold py-2 px-4 rounded-md transition-colors disabled:opacity-50"
                    >
                        <DownloadIcon />
                        {t('result.download4k')}
                    </button>
                </div>
            )}
        </div>
    );
};

export default ResultDisplay;