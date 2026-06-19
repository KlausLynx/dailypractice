import { createContext, useState, useEffect, useCallback } from 'react';

// ─────────────────────────────────────────────
const DEFAULT_SETTINGS = {
    theme: 'light',
    language: 'en',
    notifications: true,
    accessibility: {
        fontSize: 'medium',
        contrast: 'normal'
    }
};

const STORAGE_KEY = 'app_settings';

const AVAILABLE_SETTINGS = {
    theme: {
        light: 'Light',
        dark: 'Dark',
        default: 'System'
    },
    language: {
        en: 'English',
        fr: 'French',
        sp: 'Spanish'
    },
    fontSize: {
        small: 'Small',
        medium: 'Medium',
        large: 'Large'
    },
    contrast: {
        normal: 'Normal',
        high: 'High'
    }
};

// ─────────────────────────────────────────────
function loadSettings() {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved) : structuredClone(DEFAULT_SETTINGS);
    } catch (error) {
        console.error('Failed to load settings from localStorage:', error);
        return structuredClone(DEFAULT_SETTINGS);
    }
}

function saveSettings(settings) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
        return true;
    } catch (error) {
        console.error('Failed to save settings to localStorage:', error);
        return false;
    }
}

// ─────────────────────────────────────────────
const SettingsContext = createContext(null);
export { SettingsContext };

export default function SettingsProvider({ children }) {
    const [settings, setSettings] = useState(loadSettings);
    const [lastSavedAt, setLastSavedAt] = useState(null);

    useEffect(() => {
        const ok = saveSettings(settings);
        if (ok) setLastSavedAt(Date.now());
    }, [settings]);

    const updateSetting = useCallback((key, value) => {
        setSettings(prev => ({ ...prev, [key]: value }));
    }, []);

    const updateAccessibility = useCallback((key, value) => {
        setSettings(prev => ({
            ...prev,
            accessibility: { ...prev.accessibility, [key]: value }
        }));
    }, []);

    const resetToDefaults = useCallback(() => {
        setSettings(structuredClone(DEFAULT_SETTINGS));
    }, []);

    // ── Export: turn the settings object into a downloadable .json file ──
    const exportSettings = useCallback(() => {
        const blob = new Blob([JSON.stringify(settings, null, 2)], {
            type: 'application/json'
        });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'app_settings.json';
        link.click();
        URL.revokeObjectURL(url); 
    }, [settings]);

    const importSettings = useCallback((file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = (event) => {
                try {
                    const parsed = JSON.parse(event.target.result);

                    if (typeof parsed !== 'object' || parsed === null) {
                        throw new Error('File does not contain a valid settings object');
                    }

                    const merged = {
                        ...structuredClone(DEFAULT_SETTINGS),
                        ...parsed,
                        accessibility: {
                            ...DEFAULT_SETTINGS.accessibility,
                            ...(parsed.accessibility || {})
                        }
                    };

                    setSettings(merged);
                    resolve(merged);
                } catch (error) {
                    reject(error);
                }
            };

            reader.onerror = () => reject(reader.error);
            reader.readAsText(file);
        });
    }, []);

    const value = {
        settings,
        lastSavedAt,
        updateSetting,
        updateAccessibility,
        resetToDefaults,
        exportSettings,
        importSettings,
        AVAILABLE_SETTINGS
    };

    return (
        <SettingsContext.Provider value={value}>
            {children}
        </SettingsContext.Provider>
    );
}