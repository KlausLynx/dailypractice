import { useRef } from 'react';
import { useSettings } from './context/useSetting';

export default function SettingsPanel() {
    const {
        settings,
        updateSetting,
        updateAccessibility,
        resetToDefaults,
        exportSettings,
        importSettings,
        AVAILABLE_SETTINGS
    } = useSettings();

    const fileInputRef = useRef(null);

    const handleImportClick = () => fileInputRef.current?.click();

    const handleFileChosen = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            await importSettings(file);
        } catch (error) {
            alert('That file could not be imported: ' + error.message);
        } finally {
            e.target.value = '';
        }
    };

    return (
        <div>
            <h2>Settings</h2>

            <label>
                Theme
                <select
                    value={settings.theme}
                    onChange={(e) => updateSetting('theme', e.target.value)}
                >
                    {Object.entries(AVAILABLE_SETTINGS.theme).map(([key, label]) => (
                        <option key={key} value={key}>{label}</option>
                    ))}
                </select>
            </label>

            <label>
                Language
                <select
                    value={settings.language}
                    onChange={(e) => updateSetting('language', e.target.value)}
                >
                    {Object.entries(AVAILABLE_SETTINGS.language).map(([key, label]) => (
                        <option key={key} value={key}>{label}</option>
                    ))}
                </select>
            </label>

            <label>
                Notifications
                <input
                    type="checkbox"
                    checked={settings.notifications}
                    onChange={(e) => updateSetting('notifications', e.target.checked)}
                />
            </label>

            <label>
                Font size
                <select
                    value={settings.accessibility.fontSize}
                    onChange={(e) => updateAccessibility('fontSize', e.target.value)}
                >
                    {Object.entries(AVAILABLE_SETTINGS.fontSize).map(([key, label]) => (
                        <option key={key} value={key}>{label}</option>
                    ))}
                </select>
            </label>

            <label>
                Contrast
                <select
                    value={settings.accessibility.contrast}
                    onChange={(e) => updateAccessibility('contrast', e.target.value)}
                >
                    {Object.entries(AVAILABLE_SETTINGS.contrast).map(([key, label]) => (
                        <option key={key} value={key}>{label}</option>
                    ))}
                </select>
            </label>

            <div>
                <button onClick={exportSettings}>Export settings</button>

                <button onClick={handleImportClick}>Import settings</button>
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="application/json"
                    onChange={handleFileChosen}
                    style={{ display: 'none' }}
                />

                <button onClick={resetToDefaults}>Reset to defaults</button>
            </div>
        </div>
    );
}