import { useState } from "react";
import { createContext, useMemo } from "react";

const LangContext = createContext(); 

export { LangContext };

export default function LangProvider({children}) {
    const [lang, setLang] = useState('en');

    const translations = {
        en: {
            welcome: "Welcome",
            toggle: "Switch to Spanish"
        },
        es: {
            welcome: "Bienvenido",
            toggle: "Cambiar a Inglés"
        }
    };

    const toggleLang = () => {
        setLang(prevLang => prevLang === 'en' ? 'es' : 'en');
    }

    const value = useMemo(() => ({
        lang,
        translation: translations[lang],
        toggleLang
    }), [lang]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <LangContext.Provider value={value}>
            {children}
        </LangContext.Provider>
    );
}