import React from 'react';
import { useAppContext } from '../contexts/AppContext';

const SunIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

const MoonIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
  </svg>
);

const LanguageIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path d="M7 2a1 1 0 011 1v1h3a1 1 0 110 2H9.578a18.87 18.87 0 01-1.152 2.365A9.004 9.004 0 0115 11a1 1 0 11-2 0 7.002 7.002 0 00-2.032-4.938l-.07-.056A18.86 18.86 0 017 10.5V12a1 1 0 11-2 0v-1.5a1 1 0 011-1H7V6a1 1 0 01-2 0V5a1 1 0 011-1h1V3a1 1 0 011-1zm3 10a1 1 0 100 2h3a1 1 0 100-2h-3z" />
      <path d="M3 8a1 1 0 011-1h1v1a1 1 0 11-2 0V8zm-1 6a1 1 0 011-1h1v1a1 1 0 11-2 0v-1z" />
    </svg>
);

const ResetIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h5M20 20v-5h-5M4 4l1.5 1.5A9 9 0 0112 5v0a9 9 0 019 9h-2a7 7 0 00-7-7v0a7 7 0 00-5.6 2.4L4 4zM20 20l-1.5-1.5A9 9 0 0112 19v0a9 9 0 01-9-9h2a7 7 0 007 7v0a7 7 0 005.6-2.4L20 20z" />
    </svg>
);


const YouTubeIcon = () => (
    <a href="https://www.youtube.com/@3brrhman" target="_blank" rel="noopener noreferrer" aria-label="Visit YouTube Channel">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className="h-10 w-10 sm:h-12 sm:w-12 text-red-600 hover:text-red-700 transition-colors" fill="currentColor">
            <path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.728 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.176c23.497-6.093 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"/>
        </svg>
    </a>
);


const Header = ({ onReset }: { onReset: () => void }) => {
  const { theme, setTheme, language, setLanguage, t } = useAppContext();

  const Controls = () => (
    <div className="flex items-center gap-2">
      <div className="relative">
        <select
            value={language}
            onChange={(e) => setLanguage(e.target.value as 'en' | 'ar')}
            className="glass-input appearance-none rounded-md py-2 pe-8 ps-3 text-sm"
            aria-label="Language selector"
        >
            <option value="en">English</option>
            <option value="ar">العربية</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 end-2 flex items-center text-gray-500 dark:text-gray-400">
            <LanguageIcon />
        </div>
      </div>
      <button
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        className="glass-input p-2 rounded-md hover:bg-gray-500/10 dark:hover:bg-white/10 transition-colors"
        aria-label="Toggle theme"
      >
        {theme === 'light' ? <MoonIcon /> : <SunIcon />}
      </button>
      <button
        onClick={onReset}
        className="glass-input p-2 rounded-md hover:bg-gray-500/10 dark:hover:bg-white/10 transition-colors"
        aria-label={t('header.startOver')}
        title={t('header.startOver')}
      >
        <ResetIcon />
      </button>
    </div>
  );

  return (
    <div className="w-full max-w-7xl mb-6 text-center">
      <div className="grid grid-cols-3 items-center">
        <div className="flex justify-start">
          <Controls />
        </div>
        <div className="flex justify-center items-center gap-2 sm:gap-4">
          <YouTubeIcon />
          <h1 className="text-3xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-500 pb-2 whitespace-nowrap">
              {t('header.title')}
          </h1>
        </div>
        {/* Empty div for spacing, balances the grid */}
        <div />
      </div>
      <p className="text-[var(--text-muted-color)] mt-2">{t('header.subtitle')}</p>
    </div>
  );
};

export default Header;