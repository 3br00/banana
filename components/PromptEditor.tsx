import React from 'react';
import { useAppContext } from '../contexts/AppContext';

interface PromptEditorProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
}

const PromptEditor: React.FC<PromptEditorProps> = ({ prompt, setPrompt }) => {
  const { t } = useAppContext();
  return (
    <div className="glass-card rounded-2xl p-4 md:p-6 flex flex-col gap-4">
       <h2 className="text-xl font-bold">{t('prompt.title')}</h2>
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