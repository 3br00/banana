import React, {useState} from 'react';
import { useAppContext } from '../contexts/AppContext';

interface PromptEditorProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
}

const CopyIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
);

const PromptEditor: React.FC<PromptEditorProps> = ({ prompt, setPrompt }) => {
  const { t } = useAppContext();
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    if(!prompt) return;
    navigator.clipboard.writeText(prompt);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };


  return (
    <div className="glass-card rounded-2xl p-4 md:p-6 flex flex-col gap-4">
       <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">{t('prompt.title')}</h2>
            <button 
                onClick={handleCopy}
                disabled={!prompt || isCopied}
                className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white disabled:opacity-50 transition-colors"
            >
                <CopyIcon />
                {isCopied ? t('prompt.copied') : t('prompt.copy')}
            </button>
       </div>
       <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        rows={8}
        className="w-full glass-input text-gray-800 dark:text-gray-200 rounded-md p-3 text-sm leading-relaxed transition-all"
        placeholder={t('prompt.placeholder')}
      />
    </div>
  );
};

export default PromptEditor;