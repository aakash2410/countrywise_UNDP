'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Type } from 'lucide-react';

type AccessibilityContextType = {
    dyslexiaFont: boolean;
    toggleDyslexiaFont: () => void;
};

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
    const [dyslexiaFont, setDyslexiaFont] = useState(false);

    // Initialize from localStorage if available
    useEffect(() => {
        const saved = localStorage.getItem('dyslexiaFont');
        if (saved) {
            setDyslexiaFont(JSON.parse(saved));
        }
    }, []);

    const toggleDyslexiaFont = () => {
        setDyslexiaFont(prev => {
            const newState = !prev;
            localStorage.setItem('dyslexiaFont', JSON.stringify(newState));
            return newState;
        });
    };

    return (
        <AccessibilityContext.Provider value={{ dyslexiaFont, toggleDyslexiaFont }}>
            <div className={`transition-all duration-300 ${dyslexiaFont ? 'font-dyslexic text-lg leading-loose tracking-wide' : ''}`}>
                {children}
            </div>
        </AccessibilityContext.Provider>
    );
}

export function useAccessibility() {
    const context = useContext(AccessibilityContext);
    if (!context) {
        throw new Error('useAccessibility must be used within an AccessibilityProvider');
    }
    return context;
}

export function AccessibilityToggle() {
    const { dyslexiaFont, toggleDyslexiaFont } = useAccessibility();

    return (
        <div className="fixed top-4 right-4 z-50">
            <button
                onClick={toggleDyslexiaFont}
                aria-pressed={dyslexiaFont}
                aria-label={dyslexiaFont ? "Disable OpenDyslexic font" : "Enable OpenDyslexic font"}
                className={`flex items-center gap-2 px-4 py-2 rounded-full shadow-md border font-medium transition-all ${dyslexiaFont
                        ? 'bg-blue-600 text-white border-blue-700 hover:bg-blue-700'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
            >
                <Type className="w-4 h-4" />
                <span className="text-sm">Dyslexia Support</span>
            </button>
        </div>
    );
}
