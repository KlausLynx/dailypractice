import SettingsProvider from './context/settingsAuth';   
import SettingsPanel from './settingPanel';               

export default function SettingContent() {
    return (
        <SettingsProvider>
            <SettingsPanel />
        </SettingsProvider>
    )
}